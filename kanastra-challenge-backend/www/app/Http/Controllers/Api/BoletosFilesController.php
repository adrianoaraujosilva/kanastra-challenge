<?php

namespace App\Http\Controllers\Api;

use App\Jobs\BoletosImportJob;
use App\Models\BoletosFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use SplFileObject;
use Throwable;

class BoletosFilesController extends BaseApiController
{

    protected array $mapping = [
        "name",
        "governmentId",
        "email",
        "debtAmount",
        "debtDueDate",
        "debtId"
    ];

    public function __construct(protected BoletosFile $boletosFiles)
    {
        $this->boletosFiles = $boletosFiles;
    }

    /**
     * Retorna listagem de arquivos recebidos
     */
    public function index(): JsonResponse
    {
        try {
            // Recupera todos os registros paginados
            $boletosFiles = $this->boletosFiles->orderBy('created_at', 'desc')->paginate(10);

            // Retorna registros
            return $this->enviaResponse($boletosFiles);
        } catch (Throwable $th) {
            // Retorna mensagem de erro
            return $this->enviaErro(th: $th);
        }
    }

    /**
     * Recebe arquivo CSV e gera job para processar
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Efetua validações básicas
            $validator = Validator::make($request->all(), [
                "file" => "required|mimes:csv"
            ]);

            // Caso não exista erros de validação básica continua validação
            if (!$validator->fails()) {
                // Cria Streaming do arquivo para validar o cabeçalho
                $file = new SplFileObject($request->file, 'r');
                $file->setFlags(
                    SplFileObject::READ_CSV |
                        SplFileObject::READ_AHEAD |
                        SplFileObject::SKIP_EMPTY |
                        SplFileObject::DROP_NEW_LINE
                );
                // Itera o cabeçalho e confronta com a matriz definada no mapping
                foreach ($file->current() as $index => $col) {
                    if ($this->mapping[$index] != $col) {
                        // Inlcui execeção no validator
                        $validator->errors()->add('file', 'Arquivo fora do padrão aceito.');
                    }
                }
            }

            // Verifica se existe mensagens de erro
            if (count($validator->getMessageBag())) {
                // Retrona exceção
                return $this->enviaErro("Erro de validação!", $validator->errors()->toArray(), 422);
            }

            // Recupera nome, extensão e tamanho do arquivo
            $fileFullName = $request->file->getClientOriginalName();
            $fileName = pathinfo($fileFullName, PATHINFO_FILENAME);
            $fileExtension = $request->file->getClientOriginalExtension();
            $base = log($request->file->getSize()) / log(1024);
            $suffix = array("", "k", "M", "G", "T")[floor($base)];
            $fileSize = round(pow(1024, $base - floor($base)), 2) . $suffix;

            // Salva arquivo na pasta public
            $storedFile = $request->file->store('csv', 'public');

            // Cria registro do arquivo recebido no BD
            $boletoFile = $this->boletosFiles->create([
                "name"      => $fileName,
                "type"      => $fileExtension,
                "size"      => $fileSize,
                "name_temp" => $storedFile,
            ]);

            // Retorna mensagem caso o registro do arquivo não tenha sido efetuado
            if (!$boletoFile) {
                return $this->enviaErro("Não foi possível criar o registro.");
            }

            // Cria job para processamento do arquivo na fila BoletosImportJob
            dispatch(
                new BoletosImportJob(
                    $boletoFile,
                    storage_path("app/public/$storedFile")
                )
            )->onQueue('high');

            // Retorna resposta de sucesso
            return $this->enviaResponse($boletoFile, "Arquivo recebido em instantes será processado.");
        } catch (Throwable $th) {
            // Retorna mensagem de erro
            return $this->enviaErro(th: $th);
        }
    }
}

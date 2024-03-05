<?php

namespace App\Http\Controllers\Api;

use App\Models\Boleto;
use Illuminate\Http\JsonResponse;

use Throwable;

class BoletosController extends BaseApiController
{

    public function __construct(protected Boleto $boletos)
    {
        $this->boletos = $boletos;
    }

    /**
     * Retorna listagem de arquivos recebidos
     */
    public function index(): JsonResponse
    {
        try {
            // Recupera todos os registros paginados
            $boletos = $this->boletos->orderBy("created_at", "desc")->paginate(10);

            // Retorna registros
            return $this->enviaResponse($boletos);
        } catch (Throwable $th) {
            // Retorna mensagem de erro
            return $this->enviaErro(th: $th);
        }
    }
}

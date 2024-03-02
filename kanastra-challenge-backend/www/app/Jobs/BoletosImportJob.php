<?php

namespace App\Jobs;

use App\Models\BoletosFile;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Process\Exceptions\ProcessFailedException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Throwable;
use Illuminate\Support\Str;

class BoletosImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout             = 60;
    protected string $python        = "python3";
    protected string $filePy        = "/var/www/app/python/importCSV.py";
    protected string $dbTable       = "boletos";

    /**
     * Construtor da classe.
     */
    public function __construct(private BoletosFile $boletoFile, private string $pathFile)
    {
    }

    /**
     * Executa o JOB.
     */
    public function handle(): void
    {
        try {
            Log::info("BoletosImportJob iniciado BoletoFileId: {$this->boletoFile->id}");
            // Atualiza status do registro para 'Processando'
            $this->boletoFile->update([
                "status" => "Processando"
            ]);

            // Executa o script python para importar os boletos
            $runPy = Process::run([
                $this->python,
                $this->filePy,
                $this->pathFile,
                env(key: "DB_HOST"),
                env(key: "DB_DATABASE"),
                env(key: "DB_USERNAME"),
                env(key: "DB_PASSWORD"),
                $this->dbTable,
            ]);

            // Retorna o output do script python
            $strReturn = $runPy->output();

            // Checa se o script foi executado com sucesso, do contrário lança uma execeção
            // e o JOB vai para failed_jobs e pode ser reprocessado manualmente posteriormente
            if (!$runPy->successful() || !Str::contains($strReturn, "Tempo de execução:")) {
                throw new ProcessFailedException($runPy);
            }

            // Trata STRING para recuperar o tempo de processamento do PY
            $processTime = Str::of($strReturn)->afterLast("Tempo de execução: ")->before("\n");

            // Atualiza status do registro para 'Processado'
            $this->boletoFile->update([
                "status" => "Processado",
                "process_time" => $processTime,
            ]);

            unlink($this->pathFile);
        } catch (Throwable $th) {
            // Atualiza status do registro para 'Erro no processamento'
            $this->boletoFile->update([
                "status" => "Erro no processamento"
            ]);
            throw $th;
        } finally {
            Log::info("BoletosImportJob finalizado BoletoFileId: {$this->boletoFile->id}");
        }
    }
}

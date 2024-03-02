<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller as Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Throwable;

class BaseApiController extends Controller
{
    /**
     * Função para criar mensagem em caso de validação com sucesso
     */
    public function enviaResponse(mixed $resultado, string $mensagem = "", int $status = 200): JsonResponse
    {
        // Monta resposta
        $response = [
            'success'   => true,
            'message'   => $mensagem,
            'result'    => $resultado,
        ];

        // Retorna resposta
        return response()->json($response, $status);
    }

    /**
     * Função para criar mensagem em caso de erro na validação
     */
    public function enviaErro(
        String $erro = "",
        array $mensagemErro = [],
        int $code = 500,
        Throwable $th = null
    ): JsonResponse {
        // Loga erro
        if ($th) {
            Log::error($th);
            $erro = "Erro ao processar a requisição, contate o administrador.";
        }

        // Monta resposta
        $response = [
            'success'   => false,
            'message'   => $erro,
            'result'    => null,
        ];

        if (!empty($mensagemErro)) {
            $response['data'] = $mensagemErro;
        }

        // Retorna resposta
        return response()->json($response, $code);
    }
}

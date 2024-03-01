<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller as Controller;
use Illuminate\Http\JsonResponse;

class BaseApiController extends Controller
{
    /**
     * Funcção para criar mensagem em caso de validação com sucesso
     */
    public function enviaResponse($resultado, string $mensagem = "", int $status = 200): JsonResponse
    {
        $response = [
            'success'   => true,
            'message'   => $mensagem,
            'result'    => $resultado,
        ];

        return response()->json($response, $status);
    }

    /**
     * Função para criar mensagem em caso de erro na validação
     */
    public function enviaErro(
        String $erro = "Erro ao processar a requisição, contate o administrador.",
        array $mensagemErro = [],
        $code = 500
    ): JsonResponse {
        $response = [
            'success'   => false,
            'message'   => $erro,
            'result'    => null,
        ];

        if (!empty($mensagemErro)) {
            $response['data'] = $mensagemErro;
        }

        return response()->json($response, $code);
    }
}

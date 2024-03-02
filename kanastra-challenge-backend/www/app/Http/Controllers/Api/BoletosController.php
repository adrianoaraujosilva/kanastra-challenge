<?php

namespace App\Http\Controllers\Api;

use App\Models\Boleto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BoletosController extends BaseApiController
{
    protected $boletos;

    /**
     * BoletosController constructor.
     */
    public function __construct(Boleto $boletos)
    {
        $this->boletos = $boletos;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $boletos = $this->boletos->paginate(10);

        return $this->enviaResponse($boletos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "debt_id"       => "uuid|unique:boletos",
            "name"          => "required|string|max:100",
            "government_id" => "required|integer",
            "email"         => "required|email",
            "debtAmount"    => "required|numeric",
            "debtDueDate"   => "required|date",
            "isPaid"        => "boolean",
        ]);

        $boleto = $this->boletos->create($request->all());

        return $this->enviaResponse($boleto, "Boleto cadastrado com sucesso!");
    }

    /**
     * Display the specified resource.
     */
    public function show($debtId): JsonResponse
    {
        $boleto = null;
        if (Str::isUuid($debtId)) {
            $boleto = $this->boletos->find($debtId);
        }

        return response()->json($boleto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $debtId): JsonResponse
    {
        if (!Str::isUuid($debtId)) {
            return response()->json(["message" => "ID inválido!"], 404);
        }

        $boleto = $this->boletos->find($debtId);

        if (!$boleto) {
            return response()->json(["message" => "Boleto não localizado!"], 404);
        }

        $boleto->update($request->all());

        return response()->json($boleto);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($debtId): JsonResponse
    {
        if (!Str::isUuid($debtId)) {
            return response()->json(["message" => "ID inválido"], 404);
        }

        $boleto = $this->boletos->find($debtId);

        if (!$boleto) {
            return response()->json(["message" => "Boleto não localizado!"], 404);
        }

        $boleto->delete();

        return response()->json(["message" => "Boleto excluído com sucesso!"]);
    }
}

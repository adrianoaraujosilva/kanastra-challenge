<?php

namespace App\Http\Controllers;

use App\Models\Boletos;
use Illuminate\Http\Request;

class BoletosController extends Controller
{
    protected $boletos;

    /**
     * BoletosController constructor.
     */
    public function __construct(Boletos $boletos)
    {
        $this->boletos = $boletos;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boletos = $this->boletos->paginate(10);

        return response()->json($boletos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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

        $boletos = $this->boletos->create($request->all());

        return response()->json($boletos);
    }

    /**
     * Display the specified resource.
     */
    public function show(BoletosController $boletosController)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BoletosController $boletosController)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BoletosController $boletosController)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BoletosController $boletosController)
    {
        //
    }
}

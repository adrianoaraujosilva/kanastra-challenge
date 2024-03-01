<?php

namespace App\Http\Controllers;

use App\Imports\BoletosImport;
use App\Jobs\ProcessBatchsImportJob;
use App\Jobs\ProcessImportJob;
use App\Models\BoletoMongoDB;
use App\Models\BoletosFile;
use App\Models\BoletoTemp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use SplFileObject;
use Throwable;
use Illuminate\Support\Str;
use OzdemirBurak\JsonCsv\File\Csv;

class BoletosFilesController extends BaseApiController
{
    protected $boletosFiles;

    public function __construct(BoletosFile $boletosFiles)
    {
        $this->boletosFiles = $boletosFiles;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $boletosFiles = $this->boletosFiles->paginate(10);

            return $this->enviaResponse($boletosFiles);
        } catch (Throwable $th) {
            Log::error($th);
            return $this->enviaErro();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {

        $boletos = BoletoTemp::all();
        foreach ($boletos as $boleto) {
            dd($boleto);
        }


        $file = $request->file;
        $storedFile = $file->store('csv', 'public');

        // $filePath = storage_path("app/public/$storedFile");
        // $targetFiles = Str::beforeLast($filePath, "/");

        // Process::run("echo 'name','governmentId','email','debtAmount','debtDueDate','debtId' > $targetFiles/header.csv");
        // Process::run("cat {$filePath} >> $targetFiles/header.csv");
        // Process::run("mv $targetFiles/header.csv {$filePath}");

        // dd("oi");
        // $csv = new Csv(storage_path("app/public/$storedFile"));
        // echo 'Loaded CSV file: ' . storage_path("app/public/$storedFile") . '<br>';

        // // Convert CSV to JSON then JSON to Array.
        // $array = json_decode($csv->convert(), true);

        // // $mongo_location = 'mongodb://localhost:27017';
        // // $mongo = new MongoDB\Driver\Manager($mongo_location);
        // // echo 'Connected to ' . $mongo_location . '<br>';

        // // $mongo_bulk_write = new MongoDB\Driver\BulkWrite();
        // foreach ($array as $doc) {
        //     dd($doc);
        //     BoletoMongoDB::create($doc);
        //     // MongoDB ObjectID will be automatically generated.
        //     // $mongo_bulk_write->insert($doc);
        // }
        // // 'schooldb' is database and 'student' is collection.
        // // $mongo->executeBulkWrite('schooldb.student', $mongo_bulk_write);
        // dd('Populated MongoDB database');

        // $hashFolder = md5(uniqid(rand(), true));
        // $tempFile = storage_path("app/public/$storedFile");
        // $targetFiles = Str::beforeLast($tempFile, "/") . "/$hashFolder";

        // File::makeDirectory($targetFiles, 0777, true, true);

        // $result = Process::run("split -d -l 10000 $tempFile $targetFiles/file_part_");

        // $filesInFolder = File::allFiles($targetFiles);
        // foreach ($filesInFolder as $path) {
        //     dd($path, $path->getPathname(), $path->getFilename());
        // }
        // dd("oi", $result->successful());

        // $file1 = new SplFileObject(storage_path('app/public/' . $storedFile), 'r');
        // $file1->setFlags(
        //     SplFileObject::READ_CSV |
        //         SplFileObject::READ_AHEAD |
        //         SplFileObject::SKIP_EMPTY |
        //         SplFileObject::DROP_NEW_LINE
        // );

        // $file1->seek(PHP_INT_MAX);
        // $lineCount = $file1->key() + 1;

        // $batchSize = $lineCount / 5000;
        // for ($i = 0; $i < $batchSize; $i++) {
        //     $rowStart = 5000 * $i + 1;
        //     $rowEnd = $rowStart + 5000 - 1;

        //     echo "Row $rowStart to $rowEnd <br />";
        // }



        // dd("oi");


        // foreach ($file1 as $index => $row) {
        //     dd($index, $row);
        // }

        // // //storage_path('app/public/' . $storedFile
        // // dd($lineCount / 5000);

        // $fileStream = fopen(storage_path('app/public/' . $storedFile), 'r');
        // $skipHeader = true;
        // $count = 1;
        // $rows = fgetcsv($fileStream);
        // dd("oi", $rows);
        // while ($row = fgetcsv($fileStream)) {
        //     dd($row);
        //     if ($skipHeader) {
        //         $skipHeader = false;
        //         continue;
        //     }
        //     $count++;
        // }





        dispatch(new ProcessBatchsImportJob(storage_path('app/public/' . $storedFile)))
            ->onQueue('ProcessBatchsImportJob');
        dd("CSV is being processed...");

        try {
            $validator = Validator::make($request->all(), [
                // "name"          => "required|max:100",
                // "type"          => "required|max:30",
                // "size"          => "required|numeric",
                "file"          => "required|mimes:csv,txt"
            ]);

            if ($validator->fails()) {
                return $this->enviaErro("Erro de validação!", $validator->errors()->toArray(), 422);
            }

            $fileFullName = $request->file->getClientOriginalName();
            $fileName = pathinfo($fileFullName, PATHINFO_FILENAME);
            $fileExtension = $request->file->getClientOriginalExtension();
            $fileSize = $request->file->getSize();

            Excel::queueImport(
                new BoletosImport(),
                $request->file('file')
            )
                ->allOnQueue("BoletosImportJob");
            // ->chain([
            //     Log::info("Arquivo processado")
            // ]);

            // Excel::queueImport(
            //     new EapImport($import->id, $obraId),
            //     $request->file('files')[0]["file"]
            // )->allOnQueue("ImportEapJob");

            dd($fileFullName, $fileName, $fileExtension, $fileSize, $request->file);

            // $request->file('file')
            // $boleto = $this->boletosFiless->create($request->all());

            // return $this->enviaResponse($boleto, "Boleto cadastrado com sucesso!");
        } catch (Throwable $th) {
            Log::error($th);
            return $this->enviaErro();
        }
    }
}

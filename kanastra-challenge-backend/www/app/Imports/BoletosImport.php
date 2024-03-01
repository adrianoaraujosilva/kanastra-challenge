<?php

namespace App\Imports;

use App\Jobs\ProcessBoletosImportJob;
use App\Models\Boleto;
use Maatwebsite\Excel\Concerns\ToModel;

use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

use Maatwebsite\Excel\Concerns\WithMapping;

use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;
use Maatwebsite\Excel\Concerns\SkipsFailures;

use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterImport;
use Maatwebsite\Excel\Events\BeforeImport;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class BoletosImport implements
    // ToModel,
    // OnEachRow,
    ToCollection,
    WithHeadingRow,
    WithMapping,
    // WithValidation,
    // SkipsOnFailure,
    SkipsEmptyRows,
    ShouldQueue,
    // WithEvents,
    // WithBatchInserts,
    WithChunkReading
{

    public function chunkSize(): int
    {
        return 2000;
    }

    public function batchSize(): int
    {
        return 2000;
    }

    public static function afterImport(AfterImport $event)
    {
        // Log::info('BoletosImport finished');
        // event(new ImportEapEvent($event->getConcernable()->importId));
    }

    public static function beforeImport(BeforeImport $event)
    {
        // Log::info('BoletosImport started');
        // Import::find($event->getConcernable()->importId)
        //     ->update([
        //         "status" => "Processando"
        //     ]);
    }

    public function collection(Collection $rows)
    {
        // throw ("");
        // Log::info('BoletosImport started');
        ProcessBoletosImportJob::dispatch($rows)->onQueue('ProcessBoletosImportJob');
    }

    // public function onRow(Row $row)
    // {
    // }

    // public function model(array $row)
    // {
    //     return new Boleto([
    //         "debt_id"       => $row["debt_id"],
    //         "name"          => $row["name"],
    //         "government_id" => $row["government_id"],
    //         "email"         => $row["email"],
    //         "debt_amount"   => $row["debt_amount"],
    //         "debt_due_date" => $row["debt_due_date"],
    //     ]);
    // }

    public function map($row): array
    {
        return [
            'debt_id'       => $row["debtid"],
            'name'          => $row["name"],
            'government_id' => $row["governmentid"],
            'email'         => $row["email"],
            'debt_amount'   => $row["debtamount"],
            'debt_due_date' => $row["debtduedate"],
        ];
    }

    public function rules(): array
    {
        return [
            "debt_id"       => "uuid|unique:boletos",
            "name"          => "required|string|max:100",
            "government_id" => "required|integer",
            "email"         => "required|email",
            "debtAmount"    => "required|numeric",
            "debtDueDate"   => "required|date"
        ];
    }

    public function onFailure(Failure ...$failures)
    {
        // if ($failures) {
        //     Import::find($this->importId)->update(["is_error" => true]);
        // }

        // foreach ($failures as $failure) {
        //     ImportError::create([
        //         'import_id' => $this->importId,
        //         'row'       => $failure->row(),
        //         'attribute' => $failure->attribute(),
        //         'values'    => json_encode($failure->values()),
        //         'errors'    => json_encode($failure->errors()),
        //         'module'    => 'EAP',
        //     ]);
        // }
    }
}

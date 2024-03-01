<?php

namespace App\Jobs;

use App\Jobs\ProcessProductImportJob;
use App\Models\BoletoMongoDB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use OzdemirBurak\JsonCsv\File\Csv;
use SplFileObject;

class ProcessImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 1200;  // 20-minute timeout

    public function __construct(private string $filePath, private int $rowStart, private int $rowEnd)
    {
    }

    public function handle()
    {
        // Log::info('ProcessImportJob started');

        $mapping = [
            'debtId' => 5, 'name' => 0, 'governmentId' => 1,
            'email' => 2, 'debtAmount' => 3, "debtDueDate" => 4
        ];

        // $file = new SplFileObject($this->filePath, 'r');
        // $file->setFlags(
        //     SplFileObject::READ_CSV |
        //         SplFileObject::READ_AHEAD |
        //         SplFileObject::SKIP_EMPTY |
        //         SplFileObject::DROP_NEW_LINE
        // );

        // foreach ($file as $index => $row) {
        //     if ($index < $this->rowStart) {
        //         continue;
        //     }
        //     if ($index > $this->rowEnd) {
        //         break;
        //     }

        //     dispatch(new ProcessProductImportJob($row, $mapping))->onQueue("ProcessBoletosImportJob");
        // }

        // $fileStream = fopen($this->filePath, 'r');
        // $skipHeader = true;
        // $count = 1;
        // while ($row = fgetcsv($fileStream)) {
        //     if ($skipHeader) {
        //         $skipHeader = false;
        //         continue;
        //     }
        //     dispatch(new ProcessProductImportJob($row, $mapping))->onQueue("ProcessBoletosImportJob");
        //     $count++;
        // }
        // fclose($fileStream);

        $csv = new Csv($this->filePath);
        // echo 'Loaded CSV file: ' . $this->filePath . '<br>';

        // Convert CSV to JSON then JSON to Array.
        $array = json_decode($csv->convert(), true);

        // $mongo_location = 'mongodb://localhost:27017';
        // $mongo = new MongoDB\Driver\Manager($mongo_location);
        // echo 'Connected to ' . $mongo_location . '<br>';

        // $mongo_bulk_write = new MongoDB\Driver\BulkWrite();
        foreach ($array as $doc) {
            BoletoMongoDB::create($doc);
            // dd($doc);
            // MongoDB ObjectID will be automatically generated.
            // $mongo_bulk_write->insert($doc);
        }
        // unlink($this->filePath);
        // unlink($this->filePath);  // Delete file after reading
        // Log::info("ProcessImportJob ended: {$index}");
    }
}

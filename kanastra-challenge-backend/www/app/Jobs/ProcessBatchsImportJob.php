<?php

namespace App\Jobs;

use App\Jobs\ProcessProductImportJob;
use App\Models\BoletoMongoDB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use SplFileObject;
use Illuminate\Support\Str;
use OzdemirBurak\JsonCsv\File\Csv;

class ProcessBatchsImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private string $filePath)
    {
    }

    public function handle()
    {
        $hashFolder = md5(uniqid(rand(), true));
        $targetFiles = Str::beforeLast($this->filePath, "/") . "/$hashFolder";

        File::makeDirectory($targetFiles, 0777, true, true);

        Process::run("split -d -l 10000 $this->filePath $targetFiles/file_part_");

        // unlink($this->filePath);

        $filesInFolder = File::allFiles($targetFiles);
        $addHeader = false;
        foreach ($filesInFolder as $path) {
            if ($addHeader) {
                Process::run("echo 'name','governmentId','email','debtAmount','debtDueDate','debtId' > {$path->getPathname()}_header");
                Process::run("cat {$path->getPathname()} >> {$path->getPathname()}_header");
                Process::run("mv {$path->getPathname()}_header {$path->getPathname()}");
            } else {
                $addHeader = true;
            }

            dispatch(new ProcessImportJob($path->getPathname(), 0, 0))
                ->onQueue("ProcessImportJob");
        }

        // $csv = new Csv($this->filePath);
        // echo 'Loaded CSV file: ' . $this->filePath . '<br>';

        // // Convert CSV to JSON then JSON to Array.
        // $array = json_decode($csv->convert(), true);

        // // $mongo_location = 'mongodb://localhost:27017';
        // // $mongo = new MongoDB\Driver\Manager($mongo_location);
        // // echo 'Connected to ' . $mongo_location . '<br>';

        // // $mongo_bulk_write = new MongoDB\Driver\BulkWrite();
        // foreach ($array as $doc) {
        //     BoletoMongoDB::create($doc);
        //     // dd($doc);
        //     // MongoDB ObjectID will be automatically generated.
        //     // $mongo_bulk_write->insert($doc);
        // }
        // unlink($this->filePath);


        // Log::info('ProcessBatchsImportJob started');

        // $file = new SplFileObject($this->filePath, 'r');
        // $file->setFlags(
        //     SplFileObject::READ_CSV |
        //         SplFileObject::READ_AHEAD |
        //         SplFileObject::SKIP_EMPTY |
        //         SplFileObject::DROP_NEW_LINE
        // );

        // $file->seek(PHP_INT_MAX);
        // $lineCount = $file->key() + 1;

        // $batchSize = $lineCount / 5000;
        // for ($i = 0; $i < $batchSize; $i++) {
        //     $rowStart = 5000 * $i + 1;
        //     $rowEnd = $rowStart + 5000 - 1;

        //     dispatch(new ProcessImportJob($this->filePath, $rowStart, $rowEnd))
        //         ->onQueue("ProcessImportJob");
        // }

        // Log::info("ProcessBatchsImportJob ended: {$rowEnd}");
    }
}

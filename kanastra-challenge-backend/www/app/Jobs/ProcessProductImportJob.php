<?php

namespace App\Jobs;

use App\Models\Boleto;
use App\Models\BoletoMongoDB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessProductImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private array $rowData, private array $mapping)
    {
    }

    public function handle()
    {
        BoletoMongoDB::create([
            'debt_id'       => $this->rowData[$this->mapping['debtId']],
            'name'          => $this->rowData[$this->mapping['name']],
            'government_id' => $this->rowData[$this->mapping['governmentId']],
            'email'         => $this->rowData[$this->mapping['email']],
            'debt_amount'   => $this->rowData[$this->mapping['debtAmount']],
            'debt_due_date' => $this->rowData[$this->mapping['debtDueDate']],
        ]);

        // $category = ProductCategory::firstOrCreate(['name' => $this->rowData[$this->mapping['category']]]);
        // try {
        //     Product::updateOrCreate(
        //         ['name' => $this->rowData[$this->mapping['name']], 'category_id' => $category->id],
        //         [
        //             'description' => $this->rowData[$this->mapping['description']],
        //             'price' => $this->rowData[$this->mapping['price']],
        //             'stock_left' => $this->rowData[$this->mapping['stock']],
        //         ]
        //     );
        // } catch (\Exception $e) {
        //     Log::error($e->getMessage());
        //     Log::info(json_encode($this->rowData));
        // }
    }
}

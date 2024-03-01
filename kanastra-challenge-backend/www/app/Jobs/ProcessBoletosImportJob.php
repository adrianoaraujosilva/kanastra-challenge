<?php

namespace App\Jobs;

use App\Models\Boleto;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class ProcessBoletosImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private Collection $rows)
    {
        $this->rows = $rows;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->rows as $row) {
            Boleto::create([
                "debt_id"       => $row["debt_id"],
                "name"          => $row["name"],
                "government_id" => $row["government_id"],
                "email"         => $row["email"],
                "debt_amount"   => $row["debt_amount"],
                "debt_due_date" => $row["debt_due_date"],
            ]);
        }
    }
}

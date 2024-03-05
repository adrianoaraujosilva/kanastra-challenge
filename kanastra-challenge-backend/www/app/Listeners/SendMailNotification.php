<?php

namespace App\Listeners;

use App\Models\Boleto;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Events\MessageSent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mime\MessageConverter;

class SendMailNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageSent $messageSent): void
    {
        // Convert a mensagem para uma array
        $message = json_decode(json_encode($messageSent->data), true);

        // Checa se o evento é do tipo bank-slip-email
        // Se for, atualiza o status do boleto para "Enviado"
        if ($message["mail"] == "bank-slip-email") {
            Boleto::find($message["debtId"])->update(["bank_slip_status" => "Enviado"]);
        }
    }
}

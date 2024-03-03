<?php

namespace App\Mail;

use App\Models\Boleto;
use Carbon\Carbon;
use Eduardokum\LaravelBoleto\Boleto\Banco\Itau;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BankSlipsEmail extends Mailable
{
    use Queueable;

    protected string $debtDueDate;

    /**
     * Construtore da classe.
     */
    public function __construct(private Boleto $boleto, private Itau $boletoItau)
    {
        $this->debtDueDate = Carbon::parse($this->boleto->debtDueDate)->format('d/m/Y');
    }

    /**
     * Recupera o envelope do e-mail.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Kanastra - E-mail automático - Boleto: {$this->boleto->governmentId} - {$this->boleto->debtId}",
        );
    }

    /**
     * Define conteúdo do e-mail.
     */
    public function content(): Content
    {

        return new Content(
            view: 'mail.bank-slip-email',
            with: [
                "mail"          => "bank-slip-email",
                "id"            => $this->boleto->id,
                "name"          => $this->boleto->name,
                "governmentId"  => $this->boleto->governmentId,
                "debtId"        => $this->boleto->debtId,
                "debtDueDate"   => $this->debtDueDate,
            ]
        );
    }

    /**
     * Adiciona anexos ao e-mail.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Renderiza objeto em PDF
        $boletoItau = $this->boletoItau->renderPDF(print: false, instrucoes: false);

        return [
            Attachment::fromData(fn () => $boletoItau, "boleto_{$this->boleto->governmentId}.pdf")
                ->withMime('application/pdf')
        ];
    }
}

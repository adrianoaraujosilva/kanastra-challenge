<?php

namespace App\Jobs;

use App\Mail\BankSlipsEmail;
use App\Models\Boleto;
use Carbon\Carbon;
use Eduardokum\LaravelBoleto\Boleto\Banco\Itau;
use Eduardokum\LaravelBoleto\Pessoa;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class BoletosPdfMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $pathLogo;

    /**
     * Construtor da classe.
     */
    public function __construct(private int $limit = 100)
    {
        $this->pathLogo = public_path('images/logo_kanastra.gif');
    }

    /**
     * Executa o JOB.
     */
    public function handle(): void
    {
        // Cria objeto de beneficiário
        $beneficiario = $this->beneficiario();

        // Consulta todos boletos que ainda não foram gerados
        // Limitado a 6 boletos por execução
        $boletos = Boleto::where("bank_slip_status", "Pendente")
            ->limit($this->limit)
            ->get();

        // Itera todos os boleto não gerados
        foreach ($boletos as $index => $boleto) {
            // Cria objeto de cliente
            $pagador = $this->cessionario($boleto->name);

            // Cria objeto do boleto
            $boletoItau = $this->boletoItau(boleto: $boleto, pagador: $pagador, beneficiario: $beneficiario);

            // Define atraso na fla para envio do e-mail
            // Alguns servidores principalmente de testes
            // limitam a quantidade de e-mails enviados por segundo
            $later = $index * env(key: 'MAIL_DELAY');

            // Atualiza status do Boleto
            $boleto->update([
                'bank_slip_status' => 'Na fila',
            ]);

            // Cria e-mail e coloca na fila de baixa prioridade
            $message = (new BankSlipsEmail($boleto, $boletoItau))->afterCommit()->onQueue('low');

            // Coloca e-mail na fila para ser enviado
            Mail::to($boleto->email)->later(now()->addSecond($later), $message);
        }
    }

    // Preenche os dados do boleto (ITAU)
    private function boletoItau(Boleto $boleto, Pessoa $pagador, Pessoa $beneficiario): Itau
    {
        $boletoItau = new Itau();
        return $boletoItau->setLogo($this->pathLogo)
            ->setDataVencimento(Carbon::parse($boleto->debtDueDate))
            ->setValor($boleto->debtAmount)
            ->setNumero($boleto->id)
            ->setNumeroDocumento($boleto->governmentId)
            ->setPagador($pagador)
            ->setBeneficiario($beneficiario)
            ->setCarteira(109)
            ->setAgencia(1111)
            ->setConta(22222)
            ->setDescricaoDemonstrativo([
                'APÓS O VENCIMENTO MULTA DE 2%',
                'NÃO RECEBER APÓS 30 DIAS DO VENCIMENTO',
                "DEBTID: $boleto->debtId",
            ])
            ->setInstrucoes([
                'APÓS O VENCIMENTO MULTA DE 2%',
                'NÃO RECEBER APÓS 30 DIAS DO VENCIMENTO',
                "DEBTID: $boleto->debtId",
            ]);
    }

    // Preenche os dados do cliente
    private function cessionario(string $name): Pessoa
    {
        $pagador = new Pessoa();

        return $pagador->setNome($name);
    }

    // Preenche os dados da empresa
    private function beneficiario(): Pessoa
    {
        $beneficiario = new Pessoa();

        return $beneficiario->setDocumento(env(key: 'EMPRESA_CNPJ'))
            ->setNome(env(key: 'EMPRESA_NOME'))
            ->setCep(env(key: 'EMPRESA_CEP'))
            ->setEndereco(env(key: 'EMPRESA_ENDERECO'))
            ->setBairro(env(key: 'EMPRESA_BAIRRO'))
            ->setCidade(env(key: 'EMPRESA_CIDADE'))
            ->setUf(env(key: 'EMPRESA_UF'));
    }
}

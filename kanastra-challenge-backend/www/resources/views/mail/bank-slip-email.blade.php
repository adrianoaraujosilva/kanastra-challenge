<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <title>Kanastra Challenge</title>
</head>

<body class="antialiased">
    <div>
        <table style="width: 603px">
            <caption></caption>
            <thead>
                <th></th>
            </thead>
            <tbody>
                <tr style="height: 43.95pt;">
                    <td style="width: 171px">
                        <p><span>Número do Contrato:</span></p>
                        <p><span>Data de Vencimento:</span></p>
                        <p><span>Cessionário:</span></p>
                    </td>
                    <td style="width: 427px">
                        <p><span>&nbsp;{{ $governmentId }}</span></p>
                        <p><span>&nbsp;{{ $debtDueDate }}</span></p>
                        <p><span>&nbsp;{{ $name }}</span></p>
                    </td>
                </tr>

            </tbody>
        </table>
        <br />
        <br />
        <p>Olá, {{ $name }}! Tudo bem?</p>
        <p>Estamos enviando em anexo seu boleto Kanastra referente ao débito {{ $governmentId }} - {{ $debtId }}.
        </p>
        <p>Você pode pagar o boleto via internet banking, em lotéricas, agências bancárias ou em caixas eletrônicos até
            {{ $debtDueDate }}. Vale lembrar que não aceitamos pagamentos em cheque.</p>
        <p>Lembrando que após o pagamento o processamento pode levar até 3 dias úteis para o crédito ser reconhecido.
        </p>
        <br />
        <br />
        <p>Atenciosamente,</p>
        <img style="border-width:0px;" alt="" height="101" width="269"
            src="data:image/webp;base64,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" />
    </div>
</body>

</html>

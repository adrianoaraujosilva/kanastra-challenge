# kanastra-challenge-boilerplate

## Instalação

Para executar o projeto localmente, siga os passos abaixo:

Clone o repositório:

```sh
git clone https://github.com/adrianoaraujosilva/kanastra-challenge.git
```

Navegue até a pasta do backend e renomeie o arquivo .env.sample para .env:

```sh
cd kanastra-challenge/kanastra-challenge-backend/www
mv .env.example .env
```

_Altere os parâmetros de configuração da conta de e-mail no arquivo .env na pasta kanastra-challenge-backend/www_

Execute o comando abaixo na pasta kanastra-challenge-backend para subir o container:

```sh
cd kanastra-challenge/kanastra-challenge-backend
docker-compose up
```

Navegue até a pasta kanastra-challenge-frontend e renomeie o arquivo .env.sample para .env:

```sh
cd kanastra-challenge-frontend
mv .env.sample .env
```

Execute o comando para iniciar o servidor de teste do frontend:

```sh
npm install
npm run dev:node
```

## Observações

- A solução aplicada para fazer o upload do arquivo em menos de 60 segundos.
- A rotina de geração de pdf/envio de e-mails roda a cada 5 minutos com um atraso de 2 segundos no envio de um e-mail para o outro.
- Alguns servidores de e-mail bloqueiam a quantidade de e-mails enviados por segundo/minuto, essa questão pode gerar erros no envio dos e-mails com PDF.

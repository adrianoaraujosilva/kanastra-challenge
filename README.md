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
mv .env.sample .env
```

_Altere os parâmetros de configuração da conta de e-mail no arquivo .env na pasta kanastra-challenge-backend/www_

Execute o comando abaixo na pasta kanastra-challenge-backend para subir o container:

```sh
docker-compose up
```

Navegue até a pasta kanastra-challenge-frontend e renomeie o arquivo .env.sample para .env:

```sh
cd ../kanastra-challenge-backend/www
mv .env.sample .env
```

Execute o comando para iniciar o servidor de teste do frontend:

```sh
cd ../kanastra-challenge-frontend
npm install
npm run dev:node
```

## Observações

Alguns servidores de e-mail bloqueiam a quantidade de e-mails enviados por segundo/minuto, essa questão pode gerar erros no envio dos e-mails com PDF.

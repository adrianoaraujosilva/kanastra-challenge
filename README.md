# kanastra-challenge-boilerplate

## Instalação

Para executar o projeto localmente, siga os passos abaixo:

Clone o repositório:

```sh
git clone https://github.com/adrianoaraujosilva/kanastra-challenge.git
```

Navegue até a pasta do backend e renomeie o arquivo .env.sample para .env:

```sh
cd kanastra-challenge/kanastra-challenge-backend
mv .env.sample .env
```

Execute o comando para iniciar o servidor de teste do frontend:

```sh
cd ../kanastra-challenge-frontend
npm install
npm run dev:node
```

Navegue até a pasta kanastra-challenge-backend/www e renomeie o arquivo .env.sample para .env:

```sh
cd ../kanastra-challenge-backend/www
mv .env.sample .env
```

_Altere os parâmetros de configuração da conta de e-mail no arquivo .env na pasta kanastra-challenge-backend/www_

Execute o comando para subir o servidor do backend:

```sh
npm install
npm start
```

## Observações

Alguns servidores de e-mail bloqueiam a quantidade de e-mails enviados por segundo/minuto, essa questão pode gerar erros no envio dos e-mails com PDF.

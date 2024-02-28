#!/bin/bash

set -e

echo "Instalando dependências do projeto"
composer install
echo "Instalação concluída com sucesso!"

echo "Criando tabelas"
php artisan queue:table
php artisan migrate
echo "Tabelas criadas com sucesso!"

echo "Populando tabelas"
php /var/www/artisan db:seed
echo "Tabelas populadas com sucesso!"

echo "Publicando tradução"
php artisan vendor:publish --tag=laravel-pt-br-localization

exec "$@"

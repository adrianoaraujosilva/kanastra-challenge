#!/bin/bash

set -e

echo "Criando tabelas"
php artisan migrate
echo "Tabelas criadas com sucesso!"

echo "Populando tabelas"
php artisan db:seed
echo "Tabelas populadas com sucesso!"

echo "Publicando tradução"
php artisan vendor:publish --tag=laravel-pt-br-localization

exec "$@"

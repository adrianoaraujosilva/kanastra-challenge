#!/bin/bash

set -e

echo "Instalando pacotes"
composer install

echo "Concedendo acesso as pastas"
chmod -R 777 /var/log/
chmod -R 777 /var/www/storage
chmod -R 777 /var/www/public

echo "Criando tabelas"
php artisan migrate
echo "Tabelas criadas com sucesso!"

echo "Populando tabelas"
php artisan db:seed
echo "Tabelas populadas com sucesso!"

exec "$@"

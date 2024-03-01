FROM php:8.1.0-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    unixodbc-dev \
    gnupg2 \
    libxml2-dev

RUN apt-get install -y --no-install-recommends \
    supervisor \
    libpq-dev

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN docker-php-ext-install pgsql pdo pdo_pgsql
RUN docker-php-ext-install calendar

# Mongo
RUN apt-get install -y openssl
RUN apt-get install -y libicu-dev
RUN apt-get install -y autoconf pkg-config libssl-dev

RUN docker-php-ext-install bcmath intl opcache

RUN pecl install mongodb
RUN echo "extension=mongodb.so" >> /usr/local/etc/php/conf.d/mongodb.ini
# 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./www /var/www

COPY  ./supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY  ./supervisor/kanastra.conf /etc/supervisor/conf.d/kanastra.conf

RUN composer install

RUN chmod -R 777 /var/log/
RUN chmod -R 777 /var/www/storage
RUN chmod -R 777 /var/www/public

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./php/entrypoint.sh /entrypoint.sh
RUN chmod 0700 /entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]

CMD ["php-fpm"]
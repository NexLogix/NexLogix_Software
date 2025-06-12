FROM php:8.2-fpm

# 1) Instalar dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
  && docker-php-ext-install pdo pdo_mysql zip mbstring exif pcntl bcmath gd

# 2) Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3) Crear directorio de trabajo
WORKDIR /var/www/html

# 4) Exponer el puerto de FPM (9000)
EXPOSE 9000

# 5) Comando por defecto
CMD ["php-fpm"]

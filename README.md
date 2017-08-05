# Выпускной проект в Loftschool

Этот сайт был создан мной в процессе обучения. Через некоторое время структура проекта была переосмыслена и приведена к 
компонентному виду. На данный момент сборка проекта представляет из себя следующее:

* Webpack 2
    * Common
        * Pug
        * Babel (es2015)
        * Scss
        * PostCSS / Autoprefixer
        * JS linting
        * CSS linting
        * Modernizr
        * SVG Sprites
        * PNG Sprites
        * Font Awesome
    * Development environment
        * DevServer + Hot module replacement
    * Production environment
        * Uglify JS
        * PostCSS / Discard duplicates
        * Favicons

#### Демо

https://dimasi.github.io/

#### Установка

1. Склонируйте репозиторий

    ```git clone https://github.com/dimasi/loftschool-project.git site```
2. Перейдите в директорию с проектом

    ```cd site```
3. Установите зависимости

    ```yarn```
    
После установки будут доступны следующие команды:
* запустить dev-server: ```yarn run start```
* собрать проект: ```yarn run build```
* запустить static-server чтобы посмотреть сборку в браузере: ```yarn run serv```

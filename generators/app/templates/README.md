# vector startup layout project

### Стартовый сборщик проектов для верстки сайта.

Gulp — задачи для сборки, которые не связаны с JS  
Webpack — используется только для работы с JS файлами

Стили проекта пишутся на SCSS  
HTML собирается через шаблонизатор Nunjucks  
Векторные иконки собираются в svg sprite или можно использовать icon fonts

## Установка

### Шаг 1. Подготовительный

Установить nodejs — https://nodejs.org/en/  
Установить yarn — https://yarnpkg.com/lang/en/ (опционально)

### Шаг 2. Установка необходимых пакетов
В качестве менеджера пакетов используется npm или yarn  
Устанавливаем пакеты:
```bash
npm i
```

### Шаг 3. Запуск
Для запуска проекта:

в режиме Разработчика
```bash
npm run dev
```

в режиме Публикации готового проекта
```bash
npm run build
```

## Структура проекта

* build/ - сюда будет собираться проект
* gulp/ - задачи для gulp
* node_modules/
* src/ - папка с исходниками проекта
* .babelrc - настройки для babel loader
* .eslintrc - настройки для линтера
* .gitignore
* faviconData.json - настройки для генерации favicon.ico
* gulpfile.js
* package.json
* README.md
* webpack.config.js


### Содержимое папки src

* fonts             : шрифты проекта
* icons             : svg иконки, для последующей сборки в svg спрайт
* images
  * demo            : демо изображения
  * sprites         : .png иконки, для последующей сборки в png спрайт
  * favicon.png     : картинка png 256x256px для генерации favicon.ico
* js
  * app             : свои скрипты
  * vendor          : сторонние плагины, скрипты
 * app.js           : подключение своих скриптов
 * vendor.js        : подключение, импорт скриптов из папки vendor, node_modules, bower_components
* pages
  * data            : данные в формате JSON для каждой страницы проекта, напр. index.json, news.json, catalog.json
  * extends         : обертка для страниц
  * templates       : шаблоны, блоки для страниц
  * index.html      : индексная страница проекта
  * news.html       : дополнительные страницы проекта
* scss
  * 0-settings      : настройки (не генерируют стили на выходе)
    * variables     : настройки глобальных переменных проекта
  * 1-tools         : инструменты (не генерируют стили на выходе)
    * functions     : функции SASS
    * mixins        : миксины SASS
  * 2-fonts         : подключение пользовательских шрифтов
  * 3-generic       : сброс или нормализация стилей, стили для печати, подключение шрифтов
  * 4-vendor        : стили сторонних скриптов, плагинов
  * 5-elements      : базовые стили html элементов (h1, a, p, ul, li ...)
  * 6-components    : пользовтельские ui компоненты
    * sprites       : авто генерируемые файлы для формирования png, svg спрайтов
  * 7-helpers       : классы помощники (show, hide, text-center ...)
  * main.scss       : импорт функций, миксинов, переменных, базовых и пользовательских стилей в проект


## Обновление пакетов

Установить глобально пакет ncu
```bash
npm install ncu -g
```

Проверить обновления
```bash
ncu
```

## Генератор favicon

Используется сервис https://realfavicongenerator.net/favicon/gulp
В папке gulp/tasks/favicon.js расширенные настройки по генерации

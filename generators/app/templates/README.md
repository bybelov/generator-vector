# vector startup layout project

## Install

### Step 1

Install nodejs — https://nodejs.org/en/ or
Install yarn — https://yarnpkg.com/lang/en/ (option)

### Step 2. Install packages

```bash
npm i
```

or

```bash
yarn
```

### Step 3. Start

Developer build

```bash
npm run start
```

Publication build

```bash
npm run build
```

### Other tasks

Task name          | Description
:------------------|:----------------------------------
`clean`            | remove `./build` folder
`copy`             | copy common files from `./src` path to `./build` path
`css:critical`     | critical extracts & inlines critical-path (above-the-fold) CSS from HTML [critical-css](https://www.npmjs.com/package/critical)
`favicon`          | favicon, manifest generator
`images`           | copy and optimize images
`inject`           | сreate a list of layout pages from the json file of each page
`nunjucks`         | compile Mozilla's awesome [nunjucks](https://mozilla.github.io/nunjucks/) templates
`scss`             | compile .scss to .css.
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`sprite:png`       | create png sprites
`sprite:svg`       | create svg symbol sprites
`video`            | copy video files
`webpack`          | compile .js sources into bundle file

## Project structure

* build/ - destination path
* gulp/ - gulp tasks
* node_modules/
* src/ - source path
* .babelrc - babel loader setting
* .browserslistrc - browser version support
* .eslintrc - linter setting
* .gitignore
* jsconfig.json
* gulpfile.babel.js - task runner gulp
* package.json
* README.md
* webpack.config.js

### SRC folder

* fonts                   : fonts
* icons                   : svg icons for svg sprite
* images
  * demo                  : path for demo images
  * sprites               : .png icons for png sprite
  * favicon.png           : source picture 512x512px for favicon.ico
* js
  * app                   : custom scripts
  * vendor                : vendor scripts, plugins
  * app.js                : init custom scripts
  * vendor.js             : init vendor scripts
* scss
  * 0-settings            : setting
    * variables           : setting global variables
  * 1-tools               : tools for sass
    * functions           : sass functions
    * mixins              : sass mixins
  * 2-fonts               : custom fonts
  * 3-generic             : reset styles, print styles
  * 4-vendor              : vendor styles
  * 5-elements            : base element styles (h1, a, p, ul, li ...)
  * 6-components          : custom styles
    * sprites             : don't edit, for sprites
  * 7-helpers             : helper custom styles (show, hide, text-center ...)
  * main.scss             : main sass file
* templates
  * components            : nunjucks templates
  * components-macros     : nunjucks macros
  * components-wrapper    : nunjucks wrapper for pages
  * data                  : JSON data for every pages
    * news
      * news-detail.json  : data for news-detail page
      * news-list.json    : data for news-list page
    index.json            : data for index page
    main-page.json        : data for main page
    ui-kit.json           : data for ui kit page
  * pages                 : njk (html) pages
    * news                : example category pages
      * new-detail.html   : example news-detail page
      * new-list.html     : example news-list page
    * index.html          : index page, don't edit this page
    * main-page.html      : main page layout
    * ui-kit.html         : default ui kit
* videos                  : path for demo video files

## Update packages

install ncu package

```bash
npm install ncu -g
```

check updates

```bash
ncu
```

## Generator favicon

Use https://realfavicongenerator.net/favicon/gulp
./gulp/tasks/favicon.js setting for generator

## Flags

```bash
gulp --open
```

or

```bash
gulp server --open
```

run dev server and then open preview in browser

```bash
gulp --tunnel=[name]
```

or

```bash
gulp server --tunnel [name]
```

runs dev server and allows you to easily share a web service on your local development machine (powered by localtunnel.me). Your local site will be available at [name].localtunnel.me.

or

```bash
gulp [task_name] --production
```

run task in production mode. Some of the tasks (like, sass or js compilation) have additional settings for production mode (such as code minification), so with this flag you can force production mode. gulp build uses this mode by default.

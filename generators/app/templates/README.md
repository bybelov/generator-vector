# vector startup layout project

## Install

### Step 1.

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
`scss` 	           | compile .scss to .css.
`css:critical`     | critical extracts & inlines critical-path (above-the-fold) CSS from HTML [critical-css](https://www.npmjs.com/package/critical)
`webpack`          | compile .js sources into bundle file
`copy`             | copy common files from `./src` path to `./build` path
`video`            | copy video files
`nunjucks`         | compile Mozilla's awesome [nunjucks](https://mozilla.github.io/nunjucks/) templates
`images`           | copy and optimize images
`sprite:svg`       | create svg symbol sprites
`sprite:png`       | create png sprites
`favicon`          | favicon, manifest generator
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./build` folder

## Project structure

* build/ - destination path
* gulp/ - gulp tasks
* node_modules/
* src/ - source path
* .babelrc - babel loader setting
* .eslintrc - linter setting
* .gitignore
* faviconData.json - favicon.ico setting
* gulpfile.js
* package.json
* README.md
* webpack.config.js

### SRC folder

* fonts             : fonts
* icons             : svg icons for svg sprite
* images
  * demo            : path for demo images
  * sprites         : .png icons for png sprite
  * favicon.png     : source picture 512x512px for favicon.ico
* js
  * app             : custom scripts
  * vendor          : vendor scripts, plugins
 * app.js           : init custom scripts
 * vendor.js        : init vendor scripts
* pages
  * data            : JSON data for every pages, example: index.json, news.json, catalog.json
  * extends         : wrapper for pages
  * templates       : templates
  * index.html      : index page
  * news.html       : other website pages
* scss
  * 0-settings      : setting (не генерируют стили на выходе)
    * variables     : setting global variables
  * 1-tools         : tools for sass
    * functions     : sass functions
    * mixins        : sass mixins
  * 2-fonts         : custom fonts
  * 3-generic       : reset styles, print styles
  * 4-vendor        : vendor styles
  * 5-elements      : base element styles (h1, a, p, ul, li ...)
  * 6-components    : custom styles
    * sprites       : don't edit, for sprites
  * 7-helpers       : helper custom styles (show, hide, text-center ...)
  * main.scss       : main sass file


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

##Flags

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
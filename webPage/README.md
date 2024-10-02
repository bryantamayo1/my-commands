# ![Logo](/docs/favicon-32x32.png) mycommands-webapp-frontend
> Frontend of My commands web application built with Javascript & HTML5 & CCS3 & [template-web-dotenv](https://github.com/bryantamayo1/template-web-dotenv). Link: https://mycommands.es  

<br/>

![Home page](/docs/home_page..PNG) 
<br/>
<br/>

![Modal](/docs/modal..PNG) 

## Table of contents
1. [About](#about)
2. [Installation](#installation)
3. [Structure of project](#structure-of-project)
4. [Libraries](#libraries)
5. [Updates](#updates)
6. [Licence](#license)

## About
Web page with different kind of commands such as data bases, servers, S.O. and much more.

## Installation
1. Install libraries
```
    npm install
```
2. Run project
```
    npm start
```
3. Build project
```
    npm run build
```
4. Optionals
    - 4.1. Create files: *.env.development.local* and *.env.production.local* to global variables with API_URL, e.g. API_URL=https://api.anyweb.es

## Structure of project

    ├── build                               # code for production
    ├── config-webpack                      # setup of webpack
    │   ├──  webpack.dev.js                 # setup only for dev
    │   └──  webpack.prod.js                # setup only for prod
    ├── docs                                # screenshots of updatings
    ├── node_modules                        # libraries after of installing with npm install
    ├── files-to-build                      # files to copy in build folder, e.g: manifest.json, robots.txt, etc
    ├── src                                 # code for development
    │   ├──  img                            # folder to images
    │   │    └──  favicon                   # folder to favicon’s
    │   ├──  js                             # only files javascript
    │   │    ├──  data.json                 # info in language 'en' and 'es'
    │   │    ├──  effects.js                # code that control effects, for instance open and close menu filter
    │   │    ├──  handleErrors.js           # handle errors with event unhandledrejection
    │   │    ├──  handleLanguages.js        # handle languages 'en' and 'es'
    │   │    ├──  index.js                  # main file js
    │   │    ├──  modal.js                  # handle modal openm close and show info inside
    │   │    ├──  pagination.js             # handle pagination
    │   │    ├──  prism.js                  # handle styles of code to git, bash, react, ...
    │   │    ├──  services.js               # all services of web page: getCommands and getFilters
    │   │    └──  utils.js                  # utils such as parseQuery, getQueries, getQueriesCommanMeaning
    │   ├──  styles                         # only files css
    │   │    ├── footer.css                 # footer’s css
    │   │    ├── handleErros.css            # erros’s css with dialog and message
    │   │    ├── index.css                  # main’s css
    │   │    ├── normalize.css              # css to normalize the styles of web page
    │   │    ├── pagination.css             # pagination’s css
    │   │    ├── prism.css                  # prism’s css
    │   │    └── spinner.css                # spinner’s css
    │   └──  index.html                     # html file root
    ├── .env.development.local              # development global variables, e.g. API_URL
    ├── .env.production.local               # production global variables, e.g. API_URL
    ├── .gitignore                          # ignore files
    ├── babel.config.json                   # setup of library babel
    ├── LICENSE                             # License MIT
    ├── package.json.json                   # file setup of profect
    ├── postcss.config.js                   # setup of library postcss
    └── README.md                           # project’s info

## Libraries
**Prod**
- core-js
- html-loader
- moment

**Dev**
- @babel/cli
- @babel/core
- @babel/preset-env
- autoprefixer
- babel-loader
- copy-webpack-plugin
- css-loader
- css-minimizer-webpack-plugin
- dotenv-webpack
- html-webpack-plugin
- mini-css-extract-plugin
- postcss
- postcss-loader
- postcss-preset-env
- style-loader
- webpack
- webpack-cli
- webpack-dev-server

## Updates
Each six months it tries to update all project with npm-check-updates library.

## Licence
MIT License
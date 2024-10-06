<h2 align="center">
My Commands
</h2>

<div align="center"  style="margin: 30px 0px;">
	<img src="./webPage/docs/logo_lg.jpeg" width=100>
</div>

<p align="center">
<img src="https://img.shields.io/badge/REST-API-blue?style=for-the-badge&logo=api&logoColor=white" alt="REST-API"/>
<img src="https://img.shields.io/badge/Docker-1D63ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack"/>
</p>

> Platform built with JavaScript & TypeScript & HTML5 & CCS3 & [template-web-dotenv](https://github.com/bryantamayo1/template-web-dotenv) tools. Link: https://mycommands.es  

<h4>
Screenshot: Page main
</h4>

![Home page](/webPage/docs/home_page.PNG) 
<br/>

<h4>
Screenshot: Info about a command
</h4>

![Modal](/webPage/docs/modal.PNG) 
<br/>

<h4>
Screenshot: Login page
</h4>

![Modal](/webPage/docs/web-app-login.png) 
<br/>

<h4>
Screenshot: Home page
</h4>

![Modal](/webPage/docs/web-app-home.png) 
<br/>

<h4>
Screenshot: Categories page
</h4>

![Modal](/webPage/docs/web-app-categories.png) 
<br/>

<h4>
Screenshot: Commands page
</h4>

![Modal](/webPage/docs/web-app-commands.png) 
<br/>
<br/>

## Table of contents
- [Table of contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Diagram UML](#diagram-uml)
- [Documentation Swagger v0.0.1](#documentation-swagger-v001)
- [Structure of project](#structure-of-project)
- [Updates](#updates)
- [Licence](#licence)

## About
Web page with different kind of commands such as data bases, servers, S.O. and much more.

## Installation

>Each folder regards to part of project, inside you will find variables of environment with .env.example as example, you can decide between .env.development.local or .env.production.local
<br>

- To execute with Docker, you must have Docker installed beforehand
```sql
    docker-compose build --no-cache && docker compose up -d
```
- Inside web application [webApp folder] 
```bash
    # Install libraries
    npm install
    # Run application
    npm start
```
- Inside web page [webPage folder] 
```bash
    # In this case, you must create a file *.env.development.local* or *.env.production.local*. Be careful, if you are going to execute with Docker, copy this file directly
   
    # Install libraries in container
    npm install
    # Run application
    npm start
```
- Inside mongo database [mongoDb folder] 
```bash
    # Open the MongoDB shell and execute
    mongorestore backup_db  
```

## Diagram UML
![Diagram UML](/webPage/docs/diagram-uml.PNG) 
<br/>
<br/>

## Documentation Swagger v0.0.1
[Docs with Swagger](https://mycommands.es/api/v1/api-docs/)
![Documentation Swagger v0.0.1](/webPage/docs/documentation_swagger_v0_0_1.PNG) 


## Structure of project

    ├── mongoDb                             # files to charge in MongoDB shell
    ├── webApp                              # web application built with React
    ├── webPage                             # web page built with Webpack and my template *template-web-dotenv*
    ├── webServer                           # Server built with Express
    ├── docker-compose.yml                  # Docker compose's file
    └── README.md                           # project’s info


## Updates
Current version 0.0.4 05-10-2024.
<br>
Each six months it tries to update all project with npm-check-updates library.

## Licence
MIT License

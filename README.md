

# Mutual Aid

This project was generated using [Nx](https://nx.dev).

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

## Generate a Component

Run `ng g component my-component --project=my-app` to generate a new component.

## Generate a Service

Run `ng generate @schematics/angular:service --name=my-service --project=frontend-core-services --no-interactive` to generate a new Service.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Add an environment file to the project
Add a .env file in the api folder 
 - add your own DATABASE_URL in the .env file
 - add your own JWT_SECRET in the .env file

Example of file: 

    DATABASE_URL=<your url>  
    JWT_SECRET=jklasjdoij897231na

## Run project 
`npm install`  
`npm run start` to start frontend and backend in dev mode
`npx nx serve` to start the Frontend in dev mode
`npx nx serve backend` to start the Backend in dev mode

## Start the e2e tests
`npm install`  
`npx nx e2e frontend-e2e --watch`

## Features
- [NestJS](https://github.com/nestjs/nest) - a JS backend framework providing architecture out of the box with a syntax similar to Angular
- [TypeORM](http://typeorm.io/) - ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.
- [TypeScript](https://github.com/Microsoft/TypeScript) - superset of JS which compiles to JS, providing compile-time type checking
- [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication (Facebook, Google+)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a JavaScript json web tokens implementation by auth0
- [@nrwl/schematics](https://github.com/nrwl/nx/blob/master/packages/schematics/src/collection.json) - Angular CLI power-ups for modern development, example usage: `ng g @nrwl/schematics:node-app app-name --framework nestjs` 
- [@nestjs/schematics](https://github.com/nestjs/schematics/blob/master/src/collection.json) - Nest architecture element generation based on Angular schematics, example usage: `ng g @nestjs/schematics:library lib-name`
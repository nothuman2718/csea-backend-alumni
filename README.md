# CSEA Web Development - CRUD API

This is a solution to the [API - CRUD](./seed/CRUD%20API.pdf).(Slightly Modifed From Orginal Problem Statement)

## Table of contents

- [Overview](#overview)
  - [Problem Description](#problem-description)
  - [Challenges](#challenges)
  - [Enhancements](#enhancements)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [About Project](#about-project)
  - [Project Structure](#project-structure)
- [Author](#author)
- [How to Set up Locally](#set-up-locally)
- [Suggestions](#suggestions)

## Overview

### Problem Description

The task involves creating a RESTful API to facilitate Alumni Affairs, where alumni can register, log in, update, and delete their information. Additionally, the API allows current college students to view profiles of registered alumni. Try to implement as many of these.

**Graduation year must be less than or equal to 2019 there is small mistake in the problem statement example it is given 2020(But B20's are currently in college)**

#### Theses are routes defined in Problem Statement

- Alumni Registration (POST)
- Alumni Login (POST)
- Alumni Profile Update (PUT)
- Alumni Deactivation (DELETE)
- View Alumni Profiles (GET)

### Challenges

The main challenge in this problem is the verification of students. Authenticating and authorizing alumni and students is a moderate challenge in this problem.

### Enhancements

Apart from Alumni, I created other models for Admin and Student.
Admins are like Institute Administrative staff; they can create and deactivate students from the database. Students cannot register by themselves; they can only log in and update their data. Registered and authorized students could get access to all alumni details. Registered and authorized alumni can also get all other alumni details.

There is no registration for Admins. They are already added to the database.

### More Routes

#### Admin Routes

- Admin Login (POST)
- Admin StudentRegister (POST)
- Admin DeleteStudent (DELETE)

#### Student Routes

- Student Login (POST)
- Student Details Update (PUT)
- All Alumni Details (GET)

## My process

### Built with

#### Tools and Technologies

- [NodeJS](https://nodejs.org/en/docs) A JavaScript Runtime Built on Chrome's V8 JavaScript Engine
- [Express.js](https://expressjs.com/) A Fast, Unopinionated, and Minimalist Web Framework for Node.js
- [MongoDB](https://www.mongodb.com/docs/) A Source-available and Document-oriented NoSQL Database

#### Node Packages

- [Mongoose](https://mongoosejs.com/docs/) An Object Data Modeling (ODM) Library for MongoDB and Node.js
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) An implementation of JSON Web Tokens.
- [Lodash](https://lodash.com/docs/) A modern JavaScript utility library delivering modularity, performance & extras.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) A library to help you hash passwords.
- [Joi](https://joi.dev/api/) The most powerful schema description language and data validator for JavaScript.
- [config](https://www.npmjs.com/package/config) Node-config organizes hierarchical configurations for your app deployments.

### Continued development

- [Move to TypeScript](https://www.typescriptlang.org/docs/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. TypeScript is pure object-oriented with classes, interfaces, and statically typed like C# or Java.
- [Add Unit Tests and Integration Tests](https://jestjs.io/docs/en/getting-started) - Writing tests in programming is crucial for ensuring code quality and functionality. Unit tests help verify individual components function as expected, catching bugs early. Integration tests confirm different parts of the system work together correctly, identifying issues that may arise from their interaction. Tests provide a safety net for future changes, making sure updates or refactoring don't break existing functionality. They also serve as documentation, illustrating how the code is supposed to work. Overall, testing contributes to building reliable, maintainable software.
- [Add winston logger](https://www.npmjs.com/package/winston) - A logger for just about everything.For logging errors, info messages, debug messages etc ...
- [Impliment More Validation using Joi](https://joi.dev/api/) - The most powerful schema description language and data validator for JavaScript.

## About Project

### Project Structure

Project is Structured in Industry Standards in Clean and Readable Code.
Following good practices like DRY, KISS, YAGNI, etc.
![Tip](./seed/tip.png)

```
├── config(Contains all configuration files)
│   └── default.json
|   └── custom-environment-variables.json
├── middlewares(Contains all middlewares)
│   ├── adminAuth.js
│   ├── alumniAuth.js
│   └── globalCatch.js
|   └── studentAuth.js
|   └── invalidRoute.js
|   └── validateObjectId.js
├── models(Contains all models)
│   ├── admin.js
│   ├── alumni.js
│   └── student.js
├── package.json(Contains all dependencies)
├── routes(Contains all routehandlers)
│   ├── admin.js
│   ├── alumni.js
│   └── student.js
├── startup(Contains all startup files)
│   ├── config.js
│   ├── db.js
│   └── routes.js
├── index.js(Entry Point)
├── README.md(Readme File)
```

## Author

- GitHub - [VLM Lokesh](https://github.com/nothuman2718)
- Twitter - [@nothuman2718](https://x.com/nothuman2718?s=21)
- [MailMe](mailto:nothuman2.718@gmail.com)

## Set up Locally

### Prerequisites

- [NodeJS](https://nodejs.org/en/docs) A JavaScript Runtime Built on Chrome's V8 JavaScript Engine
- [MongoDB connection String](https://www.mongodb.com/docs/) A Source-available and Document-oriented NoSQL Database

### Installation

- Clone the repo
  ```sh
  git clone
  ```
- Go to the project directory
  ```sh
  cd csea-backend-alumni
  ```
- Install NPM packages
  ```sh
  npm install
  ```
- If Linux or Mac
  ```sh
  export jwtPrivateKey=yourPrivateKey
  export port=yourPortNumber
  export database=yourMongoDBConnectionString
  ```
- If Windows
  ```sh
  set jwtPrivateKey=yourPrivateKey
  set port=yourPortNumber
  set database=yourMongoDBConnectionString
  ```
- Run the server
  ```sh
  node index.js
  ```

### Suggestions

- While running the server on your machine you need fake admin data which you can get from [here](./seed/fakeAdmin.json).Password for all fake data of admin is password itself.After setting up the mongoDB connection string, you can add fake admin data to your database by many ways .One way I suuest is to use [MongoDB Compass](https://www.mongodb.com/products/compass) to import the data from JSON file import to your admin database collection.
- You can use [Postman](https://www.postman.com/) to test the API
- You can use [MongoDB Compass](https://www.mongodb.com/products/compass) to view the database

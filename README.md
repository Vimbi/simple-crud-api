# simple-crud-api

Simple CRUD API using only pure Node.js and in-memory database underneath.
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start:dev
npm run start:prod
```

After launching the application on the port (default 3000), you can send requests:

API path `/person`:
  * **GET** `/person` or `/person/${personId}` return all persons or person with corresponding `personId`
  * **POST** `/person` is used to create record about new person and store it in database
  * **PUT** `/person/${personId}` is used to update record about existing person
  * **DELETE** `/person/${personId}` is used to delete record about existing person from database

Persons are stored as `objects` that have following properties:
  * `id` — unique identifier (`string`, `uuid`) generated on server side
  * `name` — person's name (`string`, **required**)
  * `age` — person's age (`number`, **required**)
  * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

Requests to non-existing endpoints (e.g. `/some-non/existing/resource`) return error 404.

Internal server errors return error 500.

Value of port on which application is running stored in `.env` file.

## Testing

To run all tests

```
npm test
```
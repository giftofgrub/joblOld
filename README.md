# Jobly

Jobly is a concept app created to mimic the functionality of LinkedIn, a popular job application. Users can create accounts to use the features of the app. 

The app is served with a [NodeJS](https://nodejs.org/en/) backend, [Postgres](https://www.postgresql.org/) as data storage, and [React](https://reactjs.org/) for the frontend.

___
#### Features
 - User account creation required to be able to use the app. 
 - User authentication and password hashing is done using [bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/).
 - User profile edit/deletion.
 - Users can view companies, view open job postings, and apply to job postings.
 - Server-side validation using JSON Schema.
 - Postgres to store and persist data.
 
___
#### Using the app
Requirements: NPM, NodeJS, Postgres, Git.

Coming from the project folder cloned locally to your machine, create a local database, Jobly.

```sh
$ createdb jobly
$ psql jobly < data.sql
```
Run the backend locally. Install dependencies.
```sh
$ cd backend/
$ npm install
$ npm start
```
Open a new terminal window. Go to the project directory. Run the frontend locally. Install dependencies
```sh
$ cd frontend/
$ npm install
$ npm start
```
Open your web browser and head to http://localhost:3000/

# Social Network - Back End

> a social network back end made with typescript

## Setting up

 Download this project and install all dependencies using:
```
npm i
```
Then create a PostgreSQL database with whatever name you want and configure the `.env.development` and `.env.test` files using the `.env.example` file.
After than, run the migrations
```
npm run dev:migration:run
npm run test:migration:run
```
## Running the project

To start the code, run the following command

```
npm run dev
```
## Running tests

To run the tests, run the following command

```
npm run test
```
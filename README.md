# Invoice backend

Backend for [Invoice](https://github.com/kcde/invoice-frontend) project

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
Check .env.example

`MONGO_URI = your mongodb uri`

`ENV = Environment currently working on [Default should be 'DEV']`

`PRIVAT_KEY = private key for creating jwt `

`SALT_ROUNDS = salt rounds for hashing password with bcrypt`

## Run Locally

Go to the project directory

```bash
  cd invoice-frontend
```

Install dependencies

```bash
  npm install
```

Start the server in Development

```bash
  npm run dev
```

Server should be listening on port 1234

Build

```bash
  npm run build
```

## Run in Production

```bash
   npm run start
```

## Running Tests

```bash
   npm run test
```

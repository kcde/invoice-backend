# Node Typescript Starter Boilerplate
TypeScript project project boilerplate with cold-reloading, and scripts for building, development, and production environments.

## TS Config details

- rootDir: This is where TypeScript looks for our code. We've configured it to look in the src/ folder. That's where we'll write our TypeScript.
outDir: Where TypeScript puts our compiled code. We want it to go to a build/ folder.
- esModuleInterop: If you were in the JavaScript space over the past couple of years, you might have recognized that modules systems had gotten a little bit out of control (AMD, SystemJS, ES Modules, etc).
- resolveJsonModule: If we use JSON in this project, this option allows TypeScript to use it.
- lib: This option adds ambient types to our project, allowing us to rely on features from different Ecmascript versions, testing libraries, and even the browser DOM api. We'd like to utilize some es6 language features. This all gets compiled down to es5.
- module: commonjs is the standard Node module system in 2019. Let's use that.
- allowJs: If you're converting an old JavaScript project to TypeScript, this option will allow you to include .js files among .ts ones.
noImplicitAny: In TypeScript files, don't allow a type to be unexplicitly specified. Every type needs to either have a specific type or be explicitly declared any. No implicit anys.

## Scripts
### `npm run dev`
Starts application in development mode using `nodemon` and `ts-node` for hot reloading

### `npm run start`
Starts app in production by first building and then executing compiled javascript in `build/index.js`

### `npm run build`

Builds the app at  `/build` folder


# TypeScript Express.js Project

This is a simple Express.js application written in TypeScript.



## Features
- TypeScript for static type checking
- Express.js for web server functionality
- Uses `.env` for configuring environment variables (e.g., server port)



## Prerequisites
- Node.js (LTS version recommended)
- npm or yarn



## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project:
    ```bash
    cp .env.template .env
    ```
    You can change the port value to any other port number if needed.



## Migration Scripts

### 1. `migration:create`
Creates a new migration file. This script creates a new migration file in the src/migration directory. The file will be named based on the value provided for <migration_name>
```bash
npm run migration:create --name=<migration_name>
```

### 2. `migration:show`
Shows the list of all migrations and their status. This script shows all the migrations that have been applied to the database, as well as any pending migrations that haven't been applied yet.
It uses the TypeORM configuration file located at ./src/config/typeorm.ts for connecting to the database.
```bash
npm run migration:show
```

### 3. `migration:run`
Runs pending migrations to update the database schema. This script runs all pending migrations that haven't been applied to the database. It ensures your database schema is in sync with your TypeORM entities.
The migration:run script will use the TypeORM configuration file located at ./src/config/typeorm.ts for connecting to the database and applying the migrations.
```bash
npm run migration:run
```



## Running the Application

### Development Mode (with hot-reloading)
To run the application in development mode with TypeScript support, you can use the following command:
```bash
npm run dev
```
This will start the Express server using ts-node, and the server will automatically reload on code changes.

### Production Mode
To run the application in production mode, you first need to compile the TypeScript code, then start the application:

Build the project:
```bash
npm run build
```

Start the application:
```bash
npm run start
```
The server will start, and you can access it at http://localhost:3000 (the port will be read from the .env file).


## Folder Structure

```bash
/my-app
  .env              # Environment variables
  /src
    index.ts        # Main server file
  /dist             # Compiled JavaScript files
  package.json      # Project dependencies and scripts
  tsconfig.json     # TypeScript configuration
```


## Scripts
- `npm run build`: Compile TypeScript to JavaScript
- `npm run start`: Start the server with compiled JavaScript
- `npm run dev`: Start the server with ts-node for development


## Contributing
If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Please ensure your code follows the existing style and passes all tests.


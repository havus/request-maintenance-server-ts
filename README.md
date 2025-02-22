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


# Manual
This manual provides instructions for running and building an application in development and production mode.


## Development
### Running in Development Mode
To verify that the application runs correctly in development mode, follow these steps:
1. Run the following command to start the development server:
```bash
npm run dev
```
2. If the browser doesn't open automatically, open your web browser and navigate to http://localhost:8080/ to view the application.

### Building in Development Mode
To build the development server, follow these steps:
1. Run the following command to build the development server:
```bash
npm run build:dev
```
2. Run the following command to start the server:
```bash
npx serve serve:dev
```
3. Open your web browser and navigate to http://localhost:8001/ to view the application.


## Production
To verify that the application runs correctly in production mode, follow these steps:
1. Run the following command to build the production server:
```bash
npm run build:prod 
```
2. Run the following command to start the server:
```bash
npx serve serve:dist
```
3. Open your web browser and navigate to http://localhost:8000/ to view the application.
> __Important__: This project is under development. Contributors are welcome. For production, please see repository [jmulet/piworld](https://github.com/jmulet/piworld)

# ![Logo](/screenshots/logo.png)  piworld-ts-server

### About:

This is the starting seed for a web application based on nodejs express and typescript. Both, server and client, are fully written in typescript.
We start defining the model entities with typescript decorators, build entity repositories and services and, finally, routes are defined through controller classes.

The project includes the following features:

- ORM based on typeorm
- Dependency injection typedi
- Routing controllers 
- Ejs template engine

- Client side angular5
- PrimeNG components
- Client side css based on bootstrap4
- Desktop layout based on coreUI
- etc...

### Installation:
- Install mysql5.7 or later, (json type required)
- Install the latest versions of nodejs and npm
- Install latest typescript compiler
- Clone this repository in your computer
- Install dependencies: npm install
- Setup a mysql database
- Configure the server
- Launch/build the server


### Configure the server:

- Open and edit the file src/server/server-config.ts 
- Copy or move this file to src/server/server.config.ts 

### Running on dev mode:

- You can use ts-node to run the server before building. Simply call
  npm run serve

### Build: 

  npm run build

### Screenshots:

#### Login page
![Login](/screenshots/login.png) 

#### Administration desktop
![Admin](/screenshots/admin.png)

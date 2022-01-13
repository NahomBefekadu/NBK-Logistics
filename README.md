# Logistics Company Inc (Back-end Platform)
<img src="https://raw.githubusercontent.com/NahomBefekadu/NBK-Logistics/master/public/images/logistics.png">
This is a Back-end for logistics company to track inventory, with the functionality CRUD operations on Products and creation of new locations for warehouses.

## Project Setup

In order to run the project, setup .env file according to the example shown with the appropriate values that correspond to your environment. you should also run the command below to download all the dependencies required for the project.

```bash
npm install
```

#### Database Connection

After everything has been setup, you will need to connect to the database and create your tables and populate the data with the provided scripts in the file. First run the setup file and then run the populate script.

```bash
Node setupDatabase.js
```

you can Ctrl-c to exit out of that process in your terminal.

```bash
Node populateDatabase.js
```

#### Run the project

Once everything has been set up you can then run the project using the command shown below to start the server. Once you have the server running, headover to your browser and put `http://localhost:<your-port>` to go to the webpage.

you can also use your favorite command API testing tool to test the endpoints or go over to [Postman](https://www.postman.com/ "Postman's Homepage") and access the api using `http://localhost:<your-port>`.
You can follow the format of `http://localhost:<your-port>/users` when testing the API endpoints.

```bash
npm start
```

### Future Improvements
- [ ] Add User
- [ ] User Validation
- [ ] Security Check
- [ ] User Security
- [ ] Filter Functionality

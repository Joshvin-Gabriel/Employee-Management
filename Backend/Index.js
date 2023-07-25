// Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
import express from 'express';

// import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

// import routes
import router from './Routes/routes.js';

import dotenv from 'dotenv';

// Load environment variables from config.env file
dotenv.config({ path: 'config.env' });

const app = express();

// Enable CORS for all routes
app.use(cors());

// use express json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use router
app.use(router);

// Middleware to parse request body as JSON
app.use(express.json());

app.get('/', function(req, res){
  res.json({ message: 'Welcome to Securra Health' });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

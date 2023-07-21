// Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
import express from 'express';

// import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// import routes
import router from './Routes/routes.js';

const app = express();

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
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

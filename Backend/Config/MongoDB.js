// Local MongoDB Connection setup 
// Myself (Gabriel Worked Function)
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from config.env file
dotenv.config({ path: 'config.env' });

// Use the MONGO_URI environment variable from config.env
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

export default mongoose.connection;



// import { MongoClient, ServerApiVersion } from 'mongodb';
// import mongoose from 'mongoose';

// const uri = "mongodb+srv://Gabriel:Amtex123@atlascluster.b1njwlw.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // Connect to MongoDB using MongoClient and then use it with Mongoose
// client.connect().then(() => {
//   mongoose.connection = client.db();
//   console.log("Connected to MongoDB Atlas!");
// }).catch(err => {
//   console.error("Error connecting to MongoDB:", err);
// });

// export default mongoose.connection;


// import { MongoClient, ServerApiVersion } from 'mongodb';

// const uri = "mongodb+srv://Gabriel:Amtex123@atlascluster.b1njwlw.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectToMongoDB() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     return client; // Return the connected client
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// export default connectToMongoDB;

import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

import {quizRouter} from './routers/questionsRouter.js'
import {userRouter} from './routers/userRouter.js'

dotenv.config(); // getting all env keys

const app = express();    // Alternative to express  - hapi
app.use(cors());

//  app.use -> Intercept every request
 app.use(express.json()); // Every request in body is parsed as JSON
//  express.json(); Inbuilt Middleware

// Create a connection
// const MONGO_URL = "mongodb://localhost" //mongodb:localhost:27017

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL)
  await client.connect(); //promise
  console.log("Mongo DB Connected");
  return client;
}
export const client = await createConnection();

// const PORT = 9000
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send("Hi there! My name is Jayesh");
});

app.use("/", quizRouter);

app.use("/user", userRouter);

app.listen(PORT, () => console.log('Started'))
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import bodyParser from "body-parser";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

// * Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(cors());

// * Routes
app.get("/api/v1/books", (req, res) => {
  res.status(200).send({
    message: "Welcome to our book store",
  });
});

app.use('/api/v1/books', booksRoute);

// * Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/dist')));

// * Render client for any unmatched path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// * Connect to MongoDB and start the server
mongoose.connect(MONGO_URL, { dbName: "book-store-MERN" })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error while connecting to database:", error);
  });

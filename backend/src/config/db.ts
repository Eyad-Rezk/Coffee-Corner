import mongoose from "mongoose";
import {Error} from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const CONNECTION_URI = process.env.MONGO_LOCAL_URI

if (!CONNECTION_URI) {
  throw new Error("mongo uri is not defined");
}

const connectDB = async () => {
  while (true) {
    try {
      await mongoose.connect(CONNECTION_URI);
      console.log("Connected to Mongodb successfully!");
      break;
    } 
    catch (err) {
      console.error("Connection error. Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

connectDB();

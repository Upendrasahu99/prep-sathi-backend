import mongoose from "mongoose";
import process from 'process';
import {DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI) {
    throw new Error('Please define the DB_URI environment variable inside .env.<dvelopment/production>.local');
}

const connectDB = async () => {
    try {
      console.log('Connecting to database...');
      await mongoose.connect(DB_URI);
      console.log(`Connected to database: ${NODE_ENV} mode`);
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1);
    }
}

export default connectDB;

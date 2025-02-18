import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE_IN } from '../config/env.js';

import User from '../models/user.model.js';

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try{
    // Create a new user
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser){
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

    const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN});


    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true, 
      message: 'User created successfully',
      data: {
        user: newUser[0],
        token
      }
    });
  }catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error); // Pass the error to the error middleware 
  }
}
const signIn = async (req, res, next) => {
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
      const error = new Error('User not found');
      error.statusCode = 404;//No found
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      const error = new Error('Invalid password');
      error.statusCode = 401; //Unauthorized
      throw error;
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN});

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        user,
        token
      }
    });
  }catch(error){
    next(error);
  }
}

const signOut = async (req, res, next) => { 
  //Implement sign out logic here
}

export {signIn, signUp, signOut};
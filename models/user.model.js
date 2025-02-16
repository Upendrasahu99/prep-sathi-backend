import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: 2,
    maxLenght: 50
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ]
  },
  password:{
    type: String,
    required: [true, "Password is required"],
    minLength: 8,

  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

//{name: 'user', password: 'password', email: 'user@example.com', }

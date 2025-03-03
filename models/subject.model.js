import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  nameHindi:{
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 300,
  }
})

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;


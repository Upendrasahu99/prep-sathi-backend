import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
    lowercase: true,
  },
})

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;


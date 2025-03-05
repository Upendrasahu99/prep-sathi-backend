import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
  questionEnglish: {
    type: String,
    required: [true, "Question is required"],
    trim: true,
    minLength: 10,
    maxLength: 1000,
  },
  questionHindi: {
    type: String,
    required: [true, "Question is required"],
    trim: true,
    minLength: 10,
    maxLength: 1000,
  },
  optionsEnglish: {
    type:[{key: String, value: String}],
    required: [true, "Options are required"],
    validate: {
      validator: function(value){
        return value.length === 4;
      },
      message: "Options must be an array of 4 objects",
    }
  },
  optionsHindi: {
    type:[{key: String, value: String}],
    required: [true, "Options are required"],
    validate: {
      validator: function(value){
        return value.length === 4;
      },
      message: "Options must be an array of 4 objects",
    }
  },
  correctOption:{
    type: String,
    required: [true, "Correct option is required"],
    enum: ["A", "B", "C", "D"],
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: [true, "Topic is required"],
  },
  explanations: {
    type: [{key: String, explanationEnglish: String, explanationHindi: String}],
    validate: {
      validator: function(value){
        return value.length === 4;
      },
      message: "Explanations must be an array of 4 objects"
    }
  }
})

const Question = mongoose.model("Question", questionSchema);

export default Question;


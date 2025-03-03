import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Topic name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100  
  },
  nameHindi: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 300  
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject is required"],
  },
})

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;


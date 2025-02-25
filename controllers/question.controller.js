import mongoose from "mongoose";
import Question from "../models/question.model.js";

export const addQuestion = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let questionArray = req.body.data;
    const topic = req.body.topic;
    
    questionArray = questionArray.map(question => ({ ...question, topic }));

    const newQuestion = await Question.insertMany(questionArray,{ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: newQuestion,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const getQuestionsByTopic = async (req, res, next) => {
  const topic = req.params.topic;
  const {size} = req.query;
  try {
    const questions = await Question.aggregate([ {$match: {topic: new mongoose.Types.ObjectId(topic)}}, { $sample: { size: parseInt(size) } } ]);
      res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
}

export const getTotalQuestions = async (req, res, next) => {
  const topic = req.params.topic;
  try {
    const totalQuestions = await Question.countDocuments({topic: topic});
    res.status(200).json({
      success: true,
      data: totalQuestions,
    });
  } catch (error) {
    next(error);
  }
}
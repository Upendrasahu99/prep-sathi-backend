import mongoose from "mongoose";
import Question from "../models/question.model.js";

export const addQuestion = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const questionArray = req.body;


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
  try {
    const questions = await Question.find({ topic: topic });
    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
}
import { mongoose } from 'mongoose';
import Topic from '../models/topic.model.js';


export const addTopic = async (req, res, next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const {name, subject} = req.body;
    const existingTopic = await Topic.findOne({name, subject});

    if(existingTopic){
      const error = new Error('Topic already exists');
      error.statusCode = 400;
      throw error;
    }

    const newTopic = await Topic.create([{name, subject}], {session});

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      data: newTopic[0]
    })
  }catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
} 

export const getTopicsBySubject = async (req, res, next) => {
  try{
    const topics = await Topic.find({ subject: req.params.subjectId });
    res.status(200).json({
      success: true,
      data: topics
    })
  }catch(error){
    next(error);
  }
}
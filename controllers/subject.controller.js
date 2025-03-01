import mongoose from 'mongoose';
import Subject from '../models/subject.model.js';
import Topic from '../models/topic.model.js';


export const addSubject = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const {name} = req.body;
    const existingSubject = await Subject.findOne({name});

    if(existingSubject){
      const error = new Error('Subject already exists');
      error.statusCode = 400;
      throw error;
    }

    const newSubject = await Subject.create([{name}], {session});
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: newSubject[0]
    });

  }catch(error){
    next(error);
  }
}

export const getSubjects = async (req, res, next) => {
  try{
    const subjects = await Subject.find().lean();
    const subjectsWithTopics = await Promise.all(subjects.map( async (subject) => {
      const topics = await Topic.find({subject: subject._id});
      subject.topics = topics;
      return subject;
    }));

    res.status(200).json({
      success: true,
      data: subjectsWithTopics
    })
  }catch(error){
    next(error);
  }
}
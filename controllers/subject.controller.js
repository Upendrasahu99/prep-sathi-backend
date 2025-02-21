import mongoose from 'mongoose';
import Subject from '../models/subject.model.js';

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
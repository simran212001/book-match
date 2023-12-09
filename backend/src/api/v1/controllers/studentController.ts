// Express
import { Request, Response } from 'express';
// Models
import studentModel from '../models/Student';
// Services
import { getAnswers, getName, getVectors, studentWithQuestions } from '../services/studentService';
// Constants, Helpers & Types
import { ResponseCode } from '../types/enum';

export const createStudent = async (req: Request, res: Response) => {
  // Extract and trim the 'name' property from the request body
  const name = getName(req);
  // Check if the 'name' is valid
  if (!name) {
    return res.status(400).json({
      code: ResponseCode.INPUT_ERROR,
      message: 'Invalid student name',
    });
  }
  try {
    // Find the student by name
    let student = await studentModel.findOne({ name });
    // Check if the student has answers
    if (student?.answers.length) {
      // Calculate vectors
      const result = await getVectors(student);

      // Respond with success and include the student and calculation result
      return res.status(201).json({
        code: ResponseCode.SUCCESS,
        message: 'Student found.',
        student,
        result,
      });
    } else {
      let message = 'Student found.';
      // If the student does not have answers
      if (!student) {
        // If the student does not exist, create a new student with questions
        student = await studentWithQuestions(name);
        message = 'Student created successfully.';
      }

      // Respond with success and include the student information
      return res.status(201).json({
        code: ResponseCode.SUCCESS,
        message,
        student,
      });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      code: ResponseCode.SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
};

export const updateAnswers = async (req: Request, res: Response) => {
  // Extract and trim the 'name' property from the request body
  const name = getName(req);

  // Check if the 'name' is valid
  if (!name) {
    return res.status(400).json({
      code: ResponseCode.INPUT_ERROR,
      message: 'Invalid student name',
    });
  }

  // Find the student by name
  let student = await studentModel.findOne({ name });

  // Check if the student exists
  if (!student) {
    return res.status(400).json({
      code: ResponseCode.VALIDATION_ERROR,
      message: 'Student not found.',
      name,
    });
  }

  // Validate the 'answers' format
  const answers = getAnswers(req, student);

  // Return an error response if 'answers' is not a valid format
  if (!answers) {
    return res.status(400).json({
      code: ResponseCode.INPUT_ERROR,
      message: 'Invalid answers',
      answers,
    });
  }

  try {
    // Update student's answers in the database
    student = await studentModel.findOneAndUpdate({ name }, { $set: { answers } }, { new: true });

    // Calculate vectors
    const result = await getVectors(student!);
    return res.status(201).json({
      code: ResponseCode.SUCCESS,
      message: 'Answers updated successfully.',
      student,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      code: ResponseCode.SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
};

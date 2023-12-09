// Express
import { Request } from 'express';
// Models
import studentModel from '../models/Student';
// Constants, Helpers & Types
import { StudentType } from '../types';
import {
  calculateStudentScore,
  genreToVector,
  getBooksByGenre,
  getRandomQuestions,
  matchScoreWithGenre,
  scoreToVector,
} from '../utils';
import { personalities } from '../constants';

/**
 * Get answers from the request body and validate their format.
 *
 * @param req - Express request object
 * @param student - Student object containing questions information
 * @returns Validated answers if the format is correct, otherwise undefined
 */
export const getAnswers = (req: Request, student: StudentType): number[][] | undefined => {
  // Extract 'answers' from the request body
  const answers = req.body.answers;

  // Validate the 'answers' format
  const isValid =
    Array.isArray(answers) &&
    answers.length === student.questions.length && // Check if the number of answers matches the number of questions
    answers.every(
      (subArray) =>
        Array.isArray(subArray) && // Check if each element is an array
        subArray.length && // Check if each sub-array is not empty
        subArray.every((value) => typeof value === 'number'), // Check if each value is a number
    );

  // If the answers format is valid, return them, otherwise return undefined
  if (isValid) {
    return answers as number[][];
  } else {
    return undefined;
  }
};

export const studentWithQuestions = async (name: string) => {
  // Create 2 questions for the student
  const questions = getRandomQuestions(2);
  // Create a new student with the provided name and questions
  const student = await studentModel.create({ name, questions });

  return student;
};

export const getName = (req: Request) => {
  let name = req.body.name;
  if (typeof name === 'string') {
    name = name.trim().toLowerCase();
  }
  return name;
};

export const getVectors = async (student: StudentType) => {
  // Calculate the student's score and determine the genre
  const score = calculateStudentScore(student.questions, student.answers);
  const genre = matchScoreWithGenre(score)!;
  // Retrieve books based on the genre
  const books = await getBooksByGenre(genre);
  return {
    books,
    studentVector: scoreToVector(score),
    bookVector: genreToVector(genre),
    personalities,
  };
};

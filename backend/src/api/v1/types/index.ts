// Constants, Helpers & Types
import { genres, personalities } from '../constants';

export type Genre = typeof genres[number];

export type Personality = typeof personalities[number];

export type PersonalityScore = Record<Personality, number>;

export type QuestionType = {
  question: string;
  options: {
    text: string;
    personality: PersonalityScore;
  }[];
};

export type StudentType = {
  name: string;
  questions: QuestionType[];
  answers: number[][];
};

export type BookType = {
  author: string;
  description: string;
  image: string;
  link: string;
  title: string;
  genre: Genre;
};

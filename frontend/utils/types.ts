import { ReactNode } from "react";
import { personalities } from "./constants";

export type ChildrenNode = {
  children: ReactNode;
};

export type BookType = {
  author: string;
  description: string;
  image: string;
  link: string;
  title: string;
  genre: string;
};

export type Personality = (typeof personalities)[number];

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

export type StudentState = {
  student: StudentType;
  error: {
    login: string;
    answer: string;
  };
  pending: {
    login: boolean;
    answer: boolean;
  };
  result?: {
    books: BookType[];
    studentVector: number[];
    bookVector: number[];
    personalities: Personality;
  };
};

// Define the InputType prop types
export type InputTypeProps = {
  type: "checkbox" | "radio" | "select";
  onChange: (indexes: number[]) => void;
  indexes: number[];
  text: string[];
  group: string;
};

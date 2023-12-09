// Mongoose
import mongoose, { Schema } from 'mongoose';
// Constants, Helpers & Types
import { ModelType } from '../types/enum';
import { QuestionType, StudentType } from '../types';

const questionSchema = new Schema<QuestionType>({
  question: { type: String, required: true },
  options: {
    type: [
      {
        _id: false,
        text: { type: String, required: true },
        personality: {
          type: {
            _id: false,
            creative: { type: Number, required: true },
            independent: { type: Number, required: true },
            confident: { type: Number, required: true },
            intelligent: { type: Number, required: true },
            judgment: { type: Number, required: true },
          },
          required: true,
        },
      },
    ],
    required: true,
  },
});

const studentSchema = new Schema<StudentType>(
  {
    name: { type: String, required: true, unique: true },
    questions: {
      type: [questionSchema],
      required: true,
    },
    answers: {
      type: [[Number]],
      default: [],
    },
  },
  {
    collection: ModelType.STUDENT,
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
      currentTime: () => Date.now(),
    },
  },
);

export default mongoose.model(ModelType.STUDENT, studentSchema);

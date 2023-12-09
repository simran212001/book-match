import React, { useEffect, useMemo } from "react";
import { NextComponentType } from "next";
import { getRandomInputType } from "utils/helpers";
import InputType from "@/components/InputType";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  studentActions,
  selectStudent,
  updateAnswersAsync,
} from "@/redux/reducer/studentSlice";
import Spinner from "@/components/Spinner";

const QuestionForm: NextComponentType = () => {
  const dispatch = useAppDispatch();
  const { updateAnswer, clearError } = studentActions;
  const { student, pending, error } = useAppSelector(selectStudent);

  const randomInputTypes = useMemo(() => {
    // Generate random input types
    return getRandomInputType(student.questions.length);
  }, [student.name, student.questions]);

  // Memoized array of question components
  const renderQuestions = useMemo(() => {
    // Map through questionsData and generate components based on random input types
    return randomInputTypes.map((type, index) => {
      const question = student.questions[index];

      return (
        <div key={index} className="mb-4">
          {/* Display the question */}
          <label className="block text-lg font-medium mb-2">
            {question.question}
          </label>

          {/* Render the input type component */}
          <InputType
            onChange={(value) => dispatch(updateAnswer({ index, value }))}
            text={question.options.map((value) => value.text)}
            type={type}
            indexes={student.answers[index] || []}
            group={`question-${index}`}
          />
        </div>
      );
    });
  }, [student]);

  // useMemo to calculate whether the submit button should be disabled
  const disableSubmit = useMemo(
    () =>
      !(
        student.answers.length === student.questions.length &&
        student.answers.every((answer) => answer.length)
      ) || pending.answer,
    [student, pending.answer]
  );

  // Define the form submission handler function
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    dispatch(clearError()); // Clear any previous errors

    // Dispatch an asynchronous action to get student data
    dispatch(updateAnswersAsync());
  };

  // useEffect to clear errors on component mount
  useEffect(() => {
    dispatch(clearError()); // Clear errors when the component mounts
  }, []);

  // If student questions are not available, return null
  if (!student.questions.length || pending.login) {
    return null;
  }

  if (pending.answer) {
    <div className="flex max-w-md justify-center items-center">
      <Spinner />
    </div>;
  }

  // JSX for the component
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Render questions */}
        {renderQuestions}

        {/* Render errors */}
        {error.answer && (
          <div className="text-red-500">
            <p>{error.answer}</p>
          </div>
        )}

        {/* Submit button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className={`${
              disableSubmit
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white py-2 px-4 rounded`}
            disabled={disableSubmit}
          >
            Submit
          </button>
          {pending.answer && <Spinner />}
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;

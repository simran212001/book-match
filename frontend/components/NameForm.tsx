import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  studentActions,
  selectStudent,
  getStudentAsync,
} from "@/redux/reducer/studentSlice";
import Spinner from "@/components/Spinner";

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { clearError, updateName } = studentActions;
  const { student, error, pending } = useAppSelector(selectStudent);
  const [studentName, setStudentName] = useState(student.name);

  // Define the form submission handler function
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    dispatch(clearError()); // Clear any previous errors

    dispatch(updateName(studentName));
    // Dispatch an asynchronous action to get student data
    dispatch(getStudentAsync());
  };

  // useEffect to clear errors on component mount
  useEffect(() => {
    dispatch(clearError()); // Clear errors when the component mounts
  }, []);

  // useMemo to calculate whether the submit button should be disabled
  const disableSubmit = useMemo(
    () => !studentName.trim().length || pending.login,
    [studentName, pending.login]
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="font-bold mb-6 text-gray-800">Login</h2>{" "}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="studentName"
            className="block text-sm font-medium text-gray-700"
          >
            Student Name:
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {error.login && (
          <div className="text-red-500">
            <p>{error.login}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className={`${
              disableSubmit
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }  w-20 text-white p-1 pb-2 rounded-md`}
            disabled={disableSubmit}
          >
            Next
          </button>
          {pending.login && <Spinner />}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

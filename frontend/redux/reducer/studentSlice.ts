import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import axios from "services/axios";
import { StudentState } from "utils/types";
import { formatAxiosError } from "utils/helpers";

// Define the initial state for the student slice
const initialState: StudentState = {
  student: {
    name: "",
    answers: [],
    questions: [],
  },
  error: {
    login: "",
    answer: "",
  },
  pending: {
    answer: false,
    login: false,
  },
};

// Create a student slice with reducers and extra reducers
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Reset the student state to the initial state
    restore: () => initialState,
    // Clear the error in the student state
    clearError: (state) => {
      state.error = initialState.error;
    },
    // Update the answers in the student state
    updateAnswer: (state, action) => {
      const { index, value } = action.payload as {
        index: number;
        value: number[];
      };
      const answers = [...state.student.answers];
      answers[index] = value;
      state.student.answers = answers;
    },
    // Update the name in the student state
    updateName: (state, action) => {
      const name = action.payload as string;
      state.student.name = name;
    },
  },
  // Handle extra reducers for asynchronous actions
  extraReducers: (builder) => {
    builder
      .addCase(getStudentAsync.pending, (state, fdf) => {
        // Set pending to true when the getStudentAsync is pending
        state.pending.login = true;
      })
      .addCase(getStudentAsync.rejected, (state, action) => {
        // Handle the rejection of getStudentAsync
        const error = action.payload as string;
        state.error.login = error;
        state.pending.login = false;
      })
      .addCase(getStudentAsync.fulfilled, (state, action) => {
        // Handle the successful fulfillment of getStudentAsync
        const { student, result } = action.payload as StudentState;
        state.student = student;
        state.result = result;
        state.pending.login = false;
      })
      .addCase(updateAnswersAsync.pending, (state) => {
        // Set pending to true when the updateAnswersAsync is pending
        state.pending.answer = true;
      })
      .addCase(updateAnswersAsync.rejected, (state, action) => {
        // Handle the rejection of updateAnswersAsync
        const error = action.payload as string;
        state.error.answer = error;
        state.pending.answer = false;
      })
      .addCase(updateAnswersAsync.fulfilled, (state, action) => {
        // Handle the successful fulfillment of updateAnswersAsync
        const { student, result } = action.payload as StudentState;
        state.student = student;
        state.result = result;
        state.pending.answer = false;
      });
  },
});

// Define the asynchronous action for fetching a student
export const getStudentAsync = createAsyncThunk(
  "getStudent",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get current updated answers from store
      const {
        student: { student },
      } = getState() as RootState;
      const { data } = await axios.post<StudentState>("/student", {
        name: student.name,
      });
      // The value we return becomes the `fulfilled` action payload
      return data;
    } catch (error) {
      // Handle errors and reject with a formatted error message
      return rejectWithValue(formatAxiosError(error));
    }
  }
);

// Define the asynchronous action for updating answers
export const updateAnswersAsync = createAsyncThunk(
  "updateAnswer",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get current updated answers from store
      const {
        student: { student },
      } = getState() as RootState;
      const { data } = await axios.put<StudentState>("/student", {
        name: student.name,
        answers: student.answers,
      });
      // The value we return becomes the `fulfilled` action payload
      return data;
    } catch (error) {
      // Handle errors and reject with a formatted error message
      return rejectWithValue(formatAxiosError(error));
    }
  }
);

// Export the actions and selector for the student slice
export const studentActions = studentSlice.actions;
export const selectStudent = (state: RootState) => state.student;

// Export the reducer for the student slice
export default studentSlice.reducer;

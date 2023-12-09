import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import studentSlice from "./reducer/studentSlice";

// Combine multiple slices into a single root reducer
const rootReducer = combineReducers({
  student: studentSlice,
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer, // Set the combined root reducer
  middleware: (getDefaultMiddleware) => {
    // Get the default middleware provided by configureStore
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128, // Set a warning threshold for serializable checks
      },
      immutableCheck: {
        warnAfter: 128, // Set a warning threshold for immutable checks
      },
    });

    // Combine the default middleware with the thunk middleware
    return defaultMiddleware.concat(thunk);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

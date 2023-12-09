import { AxiosError } from "axios";
import { inputTypes } from "utils/constants";

/**
 * Format an Axios error message.
 * @param {any} error - The Axios error object.
 * @returns {string} The formatted error message.
 */
export const formatAxiosError = (error: any): string => {
  // Default error message for internal server errors
  let message = "Internal Server Error";

  // Check if the error is an Axios error
  if ("isAxiosError" in error && error.isAxiosError) {
    // Extract the response from the Axios error
    const response = (error as AxiosError).response;

    // Use the response's error message if available, otherwise use the default message
    message = response?.data?.message || message;
  }

  return message;
};

/**
 * Generate an array of random input types.
 * @param {number} length - The length of the array.
 * @returns {string[]} An array of randomly selected input types.
 */
export const getRandomInputType = (length: number) => {
  // Generate an array of random input types based on the specified length
  const inputs = Array.from({ length }).map(() => {
    // Generate a random index to select a random input type
    const randomIndex = Math.floor(Math.random() * inputTypes.length);

    // Return the randomly selected input type
    return inputTypes[randomIndex];
  });

  return inputs;
};

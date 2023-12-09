// API version used in the application
export const apiVersion = "/v1";

// Title of the application
export const appTitle = "Book Match";

// Possible personality types in the application
export const personalities = [
  "Creative",
  "Independent",
  "Confident",
  "Intelligent",
  "Judgment",
] as const;

// Define the possible input types for question answers elements
export const inputTypes = ["checkbox", "radio", "select"] as const;

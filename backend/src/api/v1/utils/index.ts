// Puppeteer
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer-core';
// Mongoose
import mongoose from 'mongoose';
// Constants, Helpers & Types
import { BookType, Genre, Personality, PersonalityScore, QuestionType } from '../types';
import {
  questionsData,
  genreScore,
  personalities,
  genres,
  PUPPETEER_EXECUTABLE_PATH,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_DATABASE,
} from '../constants';

// Construct MongoDB connection URL
export const mongoUrl = (db: string) =>
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${db}?authSource=${MONGO_INITDB_ROOT_USERNAME}`;

export const mongoConnect = async () => {
  // Function to connect to MongoDB
  const connect = async (db: string) =>
    new Promise<mongoose.Connection>((resolve, reject) => {
      // Create a new MongoDB connection
      mongoose.connect(mongoUrl(db), {
        serverSelectionTimeoutMS: 3000,
        keepAlive: true,
      });

      // Event handler for successful connection
      mongoose.connection.once('open', () => {
        console.log(`Connected to MongoDB (db:${db})`);
        resolve(mongoose.connection);
      });

      // Event handler for connection error
      mongoose.connection.on('error', (err) => {
        console.log(`Waiting for MongoDB (db:${db})`);
        // Destroy the connection and reject the promise
        mongoose.connection.destroy().then(() => reject());
      });
    });

  // Function to recreate the connection in case of disconnection
  const recreate = async (connection: mongoose.Connection) => {
    console.log(`Waiting for MongoDB (db:${MONGO_INITDB_DATABASE})`);
    // Destroy the connection and attempt to reconnect
    connection.destroy().then(() => reconnect());
  };

  // Function to handle reconnection
  const reconnect = async () => {
    try {
      // Connect to the MongoDB database
      const connection = await connect(MONGO_INITDB_DATABASE);
      // Event handlers for disconnection and error
      connection.on('disconnected', () => recreate(connection)).on('error', () => recreate(connection));
    } catch (error) {
      // If an error occurs during connection, attempt to reconnect
      reconnect();
    }
  };

  // Initial connection attempt
  await reconnect();
};

/**
 * Shuffles the elements of an array using the Fisher-Yates Shuffle algorithm.
 * @param array - The array to be shuffled.
 * @returns A new array with shuffled elements.
 */
const shuffleArray = <T>(array: T[]) => {
  // Clone the array to avoid modifying the original array
  const shuffledArray = array.slice();

  // Fisher-Yates Shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

/**
 * Generates an array of random questions from a given data set.
 * @param count - The number of random questions to generate.
 * @returns An array of randomly selected questions.
 */
export const getRandomQuestions = (count: number) => {
  // Generate an array of sequential indices, shuffle them, and map to questionsData
  const shuffledIndices = shuffleArray(questionsData);
  return shuffledIndices.slice(0, count);
};

export const calculateStudentScore = (questions: QuestionType[], answers: number[][]) => {
  // Initialize an object to store the cumulative personality scores
  const cumulativeScores: PersonalityScore = {
    creative: 0,
    independent: 0,
    confident: 0,
    intelligent: 0,
    judgment: 0,
  };

  let count = 0;
  // Calculate the cumulative scores
  questions.forEach((question, index) => {
    const options = question.options;
    const answer = answers[index];
    answer.forEach((index) => {
      const userPersonality = options[index].personality;
      // Iterate over the traits for each selected answer
      personalities.forEach((trait) => {
        cumulativeScores[trait] += userPersonality[trait];
      });
      // Count the number of selected options
      count++;
    });
  });

  // Calculate the average scores
  personalities.forEach((trait) => {
    cumulativeScores[trait] = Math.floor(cumulativeScores[trait] / count);
  });

  return cumulativeScores;
};

// Function to match a user with the most suitable genre based on personality scores
export const matchScoreWithGenre = (studentScore: PersonalityScore): Genre | undefined => {
  let distance = Number.POSITIVE_INFINITY;
  let userGenre: Genre | undefined;

  // Iterate through each genre
  genres.forEach((genre) => {
    // Calculate the sum of squares for the Euclidean distance calculation
    const sumOfSquares = personalities.reduce<number>((total, personality) => {
      return total + Math.pow(genreScore[genre][personality] - studentScore[personality], 2);
    }, 0);

    // Take the square root of the sum to get the Euclidean distance
    const euclideanDistance = Math.sqrt(sumOfSquares);

    // Update userGenre if the current genre has a smaller or equal distance
    if (euclideanDistance <= distance) {
      distance = euclideanDistance;
      userGenre = genre;
    }
  });

  // Return the genre that is the best match for the user
  return userGenre;
};

// Function to retrieve suitable books for a user based on their genre using web scraping
export const getBooksByGenre = async (genre: Genre): Promise<BookType[]> => {
  const launchOptions: PuppeteerLaunchOptions = {
    headless: false,
    ignoreHTTPSErrors: true,
    // because we are using puppeteer-core so we must define path to a chromium browser executable
    executablePath: PUPPETEER_EXECUTABLE_PATH,
    args: ['--lang=en-US,en', '--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'],
    defaultViewport: null,
  };

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  // go to the target web
  await page.goto(`https://www.ebooks.com/en-gh/subjects/${genre}/`, { waitUntil: 'networkidle2' });
  // wait for books to be loaded
  await page.waitForSelector('.book-details');

  const books = await page.evaluate((genre) => {
    // Select all elements with class 'book-details'
    const bookDetails = document.querySelectorAll('.book-details');

    // Convert NodeList to array and map each book details
    return Array.from(bookDetails).map((book) => {
      // Extract book details
      const title = book.querySelector('.title')?.textContent || '';
      const link = book.querySelector('.title')?.querySelector('a')?.href || '';
      const author = Array.from(book.querySelectorAll('.author'))
        ?.map((element) => element.textContent)
        .join('');
      const image = book.querySelector('img')?.getAttribute('data-src') || '';
      const description = book.querySelector('.description p')?.textContent || '';
      // Return an object with book details
      return { author, description, image, link, title, genre };
    });
  }, genre);

  // Close the browser
  await browser.close();

  return books;
};

export const genreToVector = (genre: Genre) => {
  return personalities.reduce((vector: number[], personality: Personality) => {
    vector.push(genreScore[genre][personality]);
    return vector;
  }, []);
};

export const scoreToVector = (score: PersonalityScore) => {
  return personalities.reduce((vector: number[], personality: Personality) => {
    vector.push(score[personality]);
    return vector;
  }, []);
};

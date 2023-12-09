import { Genre, Personality, QuestionType } from '../types';

// .env destructuring
export const {
  NODE_ENV,
  SERVER_HOST,
  SERVER_PORT,
  API_VERSION,
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_ROOT_USERNAME,
  PUPPETEER_EXECUTABLE_PATH,
} = process.env;

export const production = NODE_ENV === 'production';
export const development = NODE_ENV === 'development';
export const rootDir = production ? 'build/api/v1' : 'src/api/v1';
export const fileExtension = production ? '*.js' : '*.ts';

// server ready message
export const serverReady = `\n🚀 Server ready at http://${SERVER_HOST}:${SERVER_PORT}${API_VERSION}`;

export const genres = ['business', 'history', 'computers', 'law', 'art'] as const;

export const personalities = ['creative', 'independent', 'confident', 'intelligent', 'judgment'] as const;

export const genreScore: Record<Genre, Record<Personality, number>> = {
  business: {
    creative: 8,
    independent: 6,
    confident: 7,
    intelligent: 9,
    judgment: 5,
  },
  history: {
    creative: 7,
    independent: 5,
    confident: 6,
    intelligent: 8,
    judgment: 4,
  },
  computers: {
    creative: 9,
    independent: 8,
    confident: 7,
    intelligent: 9,
    judgment: 6,
  },
  law: {
    creative: 6,
    independent: 7,
    confident: 8,
    intelligent: 6,
    judgment: 7,
  },
  art: {
    creative: 9,
    independent: 9,
    confident: 8,
    intelligent: 7,
    judgment: 8,
  },
};

export const questionsData: QuestionType[] = [
  {
    question: 'You find yourself with an unexpected day off. How do you spend your time?',
    options: [
      {
        text: 'Reading a book and exploring creative hobbies.',
        personality: { creative: 8, independent: 6, confident: 4, intelligent: 7, judgment: 5 },
      },
      {
        text: 'Planning a solo adventure or trying a new activity.',
        personality: { creative: 5, independent: 8, confident: 6, intelligent: 7, judgment: 4 },
      },
      {
        text: 'Relaxing at home and enjoying a calm day.',
        personality: { creative: 3, independent: 2, confident: 5, intelligent: 4, judgment: 6 },
      },
    ],
  },
  {
    question: 'In a group project, what role do you naturally take on?',
    options: [
      {
        text: 'Brainstorming and generating creative ideas.',
        personality: { creative: 9, independent: 5, confident: 7, intelligent: 8, judgment: 6 },
      },
      {
        text: 'Working independently on a specific task.',
        personality: { creative: 4, independent: 8, confident: 5, intelligent: 6, judgment: 3 },
      },
      {
        text: 'Leading and coordinating the team.',
        personality: { creative: 6, independent: 4, confident: 9, intelligent: 7, judgment: 8 },
      },
    ],
  },
  {
    question: 'How do you handle a challenging problem at work or in your personal life?',
    options: [
      {
        text: 'Break it down into smaller parts and approach each step methodically.',
        personality: { creative: 4, independent: 5, confident: 6, intelligent: 9, judgment: 8 },
      },
      {
        text: 'Trust your instincts and take a bold, unconventional approach.',
        personality: { creative: 8, independent: 6, confident: 9, intelligent: 7, judgment: 4 },
      },
      {
        text: 'Seek advice from others and consider various perspectives.',
        personality: { creative: 6, independent: 4, confident: 5, intelligent: 8, judgment: 7 },
      },
    ],
  },
  {
    question: 'What type of learning environment do you find most effective?',
    options: [
      {
        text: 'Engaging in hands-on and practical activities.',
        personality: { creative: 8, independent: 5, confident: 6, intelligent: 7, judgment: 4 },
      },
      {
        text: 'Exploring concepts independently through self-study.',
        personality: { creative: 4, independent: 9, confident: 5, intelligent: 8, judgment: 7 },
      },
      {
        text: 'Participating in group discussions and collaborative projects.',
        personality: { creative: 3, independent: 4, confident: 6, intelligent: 5, judgment: 7 },
      },
    ],
  },
  {
    question: 'When faced with a decision, how do you typically make choices?',
    options: [
      {
        text: 'Analyzing all available information and considering pros and cons.',
        personality: { creative: 4, independent: 6, confident: 7, intelligent: 9, judgment: 8 },
      },
      {
        text: 'Following your intuition and gut feelings.',
        personality: { creative: 7, independent: 5, confident: 8, intelligent: 6, judgment: 4 },
      },
      {
        text: 'Seeking advice from others and considering their opinions.',
        personality: { creative: 3, independent: 4, confident: 5, intelligent: 6, judgment: 7 },
      },
    ],
  },
  {
    question: 'How do you prefer to express yourself in a group setting?',
    options: [
      {
        text: 'Through well-thought-out and articulate verbal communication.',
        personality: { creative: 5, independent: 6, confident: 8, intelligent: 9, judgment: 7 },
      },
      {
        text: 'Through artistic or creative contributions.',
        personality: { creative: 9, independent: 5, confident: 7, intelligent: 6, judgment: 4 },
      },
      {
        text: 'Through leading by example and actions.',
        personality: { creative: 3, independent: 4, confident: 6, intelligent: 5, judgment: 8 },
      },
    ],
  },
  {
    question: 'When facing a new challenge, what is your initial reaction?',
    options: [
      {
        text: 'Excitement and eagerness to try something new.',
        personality: { creative: 9, independent: 6, confident: 7, intelligent: 5, judgment: 4 },
      },
      {
        text: 'Calm and analytical assessment of the situation.',
        personality: { creative: 4, independent: 5, confident: 6, intelligent: 8, judgment: 7 },
      },
      {
        text: 'Confidence in your ability to adapt and overcome.',
        personality: { creative: 6, independent: 4, confident: 9, intelligent: 7, judgment: 8 },
      },
    ],
  },
  {
    question: 'How do you handle criticism or feedback?',
    options: [
      {
        text: 'Reflect on it and use it to improve your skills.',
        personality: { creative: 4, independent: 6, confident: 7, intelligent: 8, judgment: 9 },
      },
      {
        text: 'Take it as a chance to express your unique perspective.',
        personality: { creative: 8, independent: 5, confident: 6, intelligent: 4, judgment: 7 },
      },
      {
        text: 'Engage in open dialogue to understand different viewpoints.',
        personality: { creative: 6, independent: 4, confident: 5, intelligent: 7, judgment: 8 },
      },
    ],
  },
  {
    question: 'How do you approach time management?',
    options: [
      {
        text: 'Prioritize and plan tasks systematically.',
        personality: { creative: 4, independent: 5, confident: 6, intelligent: 8, judgment: 7 },
      },
      {
        text: 'Embrace flexibility and adapt to changing priorities.',
        personality: { creative: 7, independent: 6, confident: 5, intelligent: 8, judgment: 4 },
      },
      {
        text: 'Work independently at your own pace.',
        personality: { creative: 3, independent: 8, confident: 4, intelligent: 5, judgment: 6 },
      },
    ],
  },
  {
    question: 'When faced with uncertainty, how do you respond?',
    options: [
      {
        text: 'Embrace the challenge with curiosity and adaptability.',
        personality: { creative: 8, independent: 5, confident: 7, intelligent: 9, judgment: 6 },
      },
      {
        text: 'Take a step back to analyze the situation thoroughly.',
        personality: { creative: 4, independent: 6, confident: 5, intelligent: 8, judgment: 7 },
      },
      {
        text: 'Seek guidance and input from others.',
        personality: { creative: 3, independent: 4, confident: 6, intelligent: 5, judgment: 7 },
      },
    ],
  },
];

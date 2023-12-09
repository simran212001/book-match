declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      SERVER_PORT: string;
      SERVER_HOST: string;
      API_VERSION: string;
      MONGO_INITDB_ROOT_USERNAME: string;
      MONGO_INITDB_ROOT_PASSWORD: string;
      MONGO_INITDB_DATABASE: string;
      MONGO_DB_HOST: string;
      MONGO_DB_PORT: string;
      PUPPETEER_EXECUTABLE_PATH: string;
    }
  }
}

export {}

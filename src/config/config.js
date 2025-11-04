import dotenv from 'dotenv';

dotenv.config();

const getMongoUri = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/petadoption_test';
  }
  return process.env.MONGO_URI || 'mongodb://localhost:27017/petadoption';
};

const config = {
  port: process.env.PORT || 8080,
  mongoUri: getMongoUri(),
  env: process.env.NODE_ENV || 'development',
};

export default config;
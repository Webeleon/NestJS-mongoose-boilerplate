import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  mongoUrl:
    // in memory mongo for tests
    global.__MONGO_URI__ ||
    // .env override
    process.env.MONGO_URI ||
    // clevercloud env variable
    process.env.MONGODB_ADDON_URI ||
    // default value
    'mongodb://localhost/nestjs-boilerplate',
}));

import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  mongoUrl:
    process.env.MONGO_URL ||
    process.env.MONGODB_ADDON_URI ||
    'mongodb://localhost/nestjs-boilerplate',
}));

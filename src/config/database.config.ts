import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const databaseConfigSchema = Joi.object({
  mongoUrl: Joi.string().uri(),
});

export const databaseConfig = registerAs('database', async () => {
  const config = {
    mongoUrl:
      // in memory mongo for tests
      global.__MONGO_URI__ ||
      // .env override
      process.env.MONGO_URI ||
      // default value
      'mongodb://localhost/nestjs-boilerplate',
  };

  await databaseConfigSchema.validate(databaseConfig, {
    abortEarly: false,
  });

  return config;
});

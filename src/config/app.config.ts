import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const appConfigValidationSchema = Joi.object({
  port: Joi.number().port(),
});
export const appConfig = registerAs('app', async () => {
  const appConfig = {
    port: Number(process.env.PORT || 3000),
  };

  await appConfigValidationSchema.validate(appConfig, {
    abortEarly: true,
  });

  return appConfig;
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { ConfigType } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pkg from '../package.json';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('rsvp api')
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  // setup validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
    }),
  );

  // security
  app.use(helmet());
  app.enableCors();

  // start the api
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  await app.listen(config.port);
  Logger.log(`API started on port ${config.port}`, 'MAIN');
}
bootstrap();

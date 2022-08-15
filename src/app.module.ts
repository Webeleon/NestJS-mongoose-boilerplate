import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType, getConfigToken } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: async (config: ConfigType<typeof databaseConfig>) => ({
        uri: config.mongoUrl,
      }),
    }),
  ],
})
export class AppModule {}

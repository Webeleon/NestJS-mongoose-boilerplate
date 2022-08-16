import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigType, getConfigToken } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: async (config: ConfigType<typeof databaseConfig>) => {
        Logger.debug(config, 'database config');
        return {
          uri: config.mongoUrl,
        };
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    HealthModule,
  ],
})
export class AppModule {}

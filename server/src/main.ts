import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as  config from 'config';
import { AppModule } from './app.module';
const oracledb = require('oracledb');

async function bootstrap() {
  const serverConfig = config.get('server');
  oracledb.initOracleClient({libDir: '/opt/oracle/instantclient_21_1'});

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true,
    "allowedHeaders": "Content-Type, Accept, authorization",
  }
  app.enableCors(options);
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();

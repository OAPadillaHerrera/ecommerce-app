

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {LoggerMiddleware} from './Middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {

  const app = await NestFactory.create(AppModule);
  app.use (new LoggerMiddleware ().use);
  
  app.useGlobalPipes (
    new ValidationPipe ({
      whitelist: true, // Remueve propiedades no declaradas en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no declaradas
      transform: true, // Transforma automáticamente los datos a las clases D
    })

  );

  await app.listen (process.env.PORT ?? 3000);

}

bootstrap ();


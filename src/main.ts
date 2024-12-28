

/**
 * This file serves as the entry point for the NestJS application. 
 * It initializes the application, applies global middlewares and 
 * validation pipes, and starts the server on a specified port.
 */

import { NestFactory } from '@nestjs/core'; // Import the NestFactory to create the application instance.
import { AppModule } from './app.module'; // Import the root module of the application.
import { LoggerMiddleware } from './Middlewares/logger.middleware'; // Import middleware for logging requests.
import { ValidationPipe } from '@nestjs/common'; // Import the validation pipe for request validation.
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap () {

  const app = await NestFactory.create (AppModule); // Create the NestJS application instance.

  app.use (new LoggerMiddleware().use); // Apply the LoggerMiddleware globally.

  app.useGlobalPipes (

    new ValidationPipe ({

      whitelist: true, // Remove properties not defined in DTOs.
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present.
      transform: true, // Automatically transform incoming request data to DTO classes.

    }),

  );

  const swaggerConfig = new DocumentBuilder ()
    .setTitle ("PI, M4, ECOMMERCE")
    .setDescription (
    "This is an API built by using Nest.js, to be employed in Henry Module #4 Full Stack Developer Career Backend specialty."
    )
    .setVersion ("1.0")
    .addBearerAuth ()
    .build ();

  const document = SwaggerModule.createDocument (app, swaggerConfig);
  SwaggerModule.setup ("api", app, document);

  await app.listen (process.env.PORT ?? 3000); // Start the server on the specified port or default to 3000.
  
}

bootstrap();



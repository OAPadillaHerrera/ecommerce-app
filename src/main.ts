

/**
 
 * This file serves as the entry point for the NestJS application. 
 * It initializes the application, applies global middlewares and 
 * validation pipes, and starts the server on a specified port.

*/

import { NestFactory } from '@nestjs/core'; // Import the NestFactory to create the application instance.
import { AppModule } from './app.module'; // Import the root module of the application.
import { LoggerMiddleware } from './Middlewares/logger.middleware'; // Import middleware for logging requests.
import { ValidationPipe } from '@nestjs/common'; // Import the validation pipe for request validation.
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Import Swagger tools for API documentation.

async function bootstrap () {

  const app = await NestFactory.create (AppModule); // Create the NestJS application instance.
  app.use (new LoggerMiddleware ().use); // Apply the LoggerMiddleware globally to log HTTP requests.

  app.useGlobalPipes ( // Apply global pipes for request validation.

    new ValidationPipe ({

      whitelist: true, // Strip out properties not defined in the DTOs.
      forbidNonWhitelisted: true, // Throw an error for properties that are not whitelisted.
      transform: true, // Automatically transform request data into DTO instances.

    }),

  );

  const swaggerConfig = new DocumentBuilder () // Create a Swagger configuration object.
    .setTitle ("PI, M4, ECOMMERCE") // Set the title for the Swagger documentation.

    .setDescription ( // Set the description for the API documentation.

      "This is an API built using Nest.js, to be employed in Henry Module #4 Full Stack Developer Career Backend specialty."

    )

    .setVersion ("1.0") // Set the version of the API.
    .addBearerAuth () // Add Bearer Authentication for securing the API.
    .build (); // Build the Swagger configuration.

  const document = SwaggerModule.createDocument (app, swaggerConfig); // Generate the Swagger document using the configuration.
  SwaggerModule.setup ("api", app, document); // Serve the Swagger UI at the '/api' endpoint.

  await app.listen (process.env.PORT ?? 3000); // Start the server on the specified port or default to 3000.

}

bootstrap (); // Invoke the bootstrap function to start the application.

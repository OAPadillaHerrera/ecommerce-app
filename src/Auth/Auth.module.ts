

/* 

 * This file defines the `AuthModule`, which is responsible for 
 * handling authentication-related functionality within the application. 
 * Key responsibilities of this module include:
 * - Managing authentication logic and token generation (JWT).
 * - Integrating user-related operations for authentication.
 * - Providing API endpoints for login, signup, and token verification.
 
*/

import { Module } from '@nestjs/common'; // Import the decorator for defining a NestJS module.
import { AuthService } from './auth.service'; // Import the service for handling authentication logic.
import { AuthController } from './auth.controller'; // Import the controller to manage HTTP requests for authentication.
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM for database interaction.
import { Users } from '../Users/users.entity'; // Import the entity representing the 'Users' table.
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import the ConfigModule and ConfigService for managing environment variables.
import { JwtModule } from '@nestjs/jwt'; // Import the JwtModule for handling JWT-based authentication.
import { AuthGuard } from './AuthGuard'; // Import the custom AuthGuard for protecting routes.
import { UsersRepository } from 'src/Users/users.repository'; // Import the UsersRepository for database operations related to users.
import { UsersService } from 'src/Users/Users.service'; // Import the UsersService for user-related business logic.

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Users]), // Import the Users entity to enable database interactions for authentication.
    ConfigModule, // Import the ConfigModule to manage environment variables (e.g., JWT secrets).

    JwtModule.registerAsync ({

      imports: [ConfigModule], // Load the ConfigModule to access environment variables in the JWT configuration.

      useFactory: async (configService: ConfigService) => ({

        secret: configService.get<string> ('JWT_SECRET'), // Use the JWT_SECRET variable from environment variables.
        signOptions: { expiresIn: '1h' }, // Set the expiration time for JWT tokens to 1 hour.

      }),

      inject: [ConfigService], // Inject the ConfigService to access environment variables.

    }),

  ],

  providers: [

    AuthService, // Provide the AuthService for managing authentication logic.
    AuthGuard, // Provide the AuthGuard to protect routes that require authentication.
    UsersRepository, // Provide the UsersRepository for database operations related to users.
    UsersService, // Provide the UsersService for user-related logic.

  ],

  controllers: [

    AuthController, // Register the AuthController to handle HTTP requests for authentication (e.g., login, signup).

  ],

  exports: [

    AuthService, // Export the AuthService to make it reusable in other modules.
    JwtModule, // Export the JwtModule for token generation and verification in other modules.
    AuthGuard, // Export the AuthGuard to protect routes in other modules.

  ],

})

export class AuthModule {} // Define and export the AuthModule for use in the application.



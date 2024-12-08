

/**
 * This file defines the `AuthModule`, which is responsible for 
 * handling authentication-related functionality within the application. 
 * It integrates user management, business logic, and API endpoints 
 * for authentication services.
 */

import { Module } from '@nestjs/common'; // Import the decorator for defining a NestJS module.
import { AuthService } from './auth.service'; // Import the service for handling authentication logic.
import { AuthController } from './auth.controller'; // Import the controller to manage HTTP requests for authentication.
import { UsersRepository } from '../Users/users.repository'; // Import the repository for managing user-related database operations.
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM for database interaction.
import { Users } from '../Users/users.entity'; // Import the entity representing the 'Users' table.

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Users]), // Import the Users entity for database interaction.
  ],

  providers: [AuthService, UsersRepository], // Register AuthService and UsersRepository as providers for dependency injection.
  controllers: [AuthController], // Register the controller for handling authentication-related HTTP requests.
  exports: [UsersRepository], // Export UsersRepository to make it available for other modules.

})

export class AuthModule {}


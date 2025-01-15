

/**
 
 * This file defines the `UsersModule`, which is responsible for managing
 * all user-related functionality in the application, including:
 * - Database integration: Handles database operations for user data using TypeORM.
 * - Business logic: Encapsulates user-specific logic in a service layer.
 * - HTTP request handling: Manages API endpoints for user-related operations.
 * The module groups related components, ensuring a modular and maintainable structure.
 
*/

import { Module } from "@nestjs/common"; // Import the decorator for defining a NestJS module.
import { UsersService } from "./users.service"; // Import the service layer that contains business logic related to users.
import { UsersController } from "./users.controller"; // Import the controller layer that handles HTTP requests for user operations.
import { UsersRepository } from "./users.repository"; // Import the repository layer for interacting with the database for user data.
import { Users } from "./users.entity"; // Import the entity that represents the `Users` table in the database.
import { TypeOrmModule } from "@nestjs/typeorm"; // Import the TypeORM module for integrating entities and managing repositories.
import { AuthModule } from "src/auth/auth.module"; // Import the `AuthModule` for authentication and authorization functionalities.

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Users]), // Register the `Users` entity with TypeORM to enable database operations.
    AuthModule, // Import the `AuthModule` to integrate authentication and authorization features.

  ],

  providers: [

    UsersService, // Provide the `UsersService` for managing user-related business logic.
    UsersRepository, // Provide the `UsersRepository` for database interactions specific to users.

  ],

  controllers: [

    UsersController, // Register the `UsersController` to handle HTTP requests for this module.

  ],

  exports: [

    UsersService, // Export the `UsersService` to make it reusable in other modules.
    UsersRepository, // Export the `UsersRepository` to allow other modules to interact with user data.

  ],

})

export class UsersModule {} // Export the `UsersModule` so it can be imported and used in the application.


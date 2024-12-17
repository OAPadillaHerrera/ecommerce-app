

/**
 * This file defines the `UsersModule`, which is responsible for managing
 * all user-related functionality in the application, including database
 * integration, business logic, and HTTP request handling.
 */

import { Module } from "@nestjs/common"; // Import the decorator for defining a NestJS module.
import { UsersService } from "./users.service"; // Import the service layer that contains business logic related to users.
import { UsersController } from "./users.controller"; // Import the controller layer that handles HTTP requests for user operations.
import { UsersRepository } from "./users.repository"; // Import the repository layer for interacting with the database for user data.
import { Users } from "./users.entity"; // Import the entity that represents the `Users` table in the database.
import { TypeOrmModule } from "@nestjs/typeorm"; // Import the TypeORM module for integrating entities and managing repositories.
import { AuthService } from "../Auth/Auth.service";
import { forwardRef } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "src/Auth/AuthGuard";
import { AuthModule } from "src/auth/auth.module";

@Module ({

    imports: [

        TypeOrmModule.forFeature ([Users]), // Register the `Users` entity with TypeORM to enable database operations.
        AuthModule,
    ],

    providers: [UsersService, UsersRepository], // Declare the service and repository as providers for dependency injection.
    controllers: [UsersController], // Register the controller that handles HTTP requests for this module.
    exports: [UsersService, UsersRepository], // Export the repository to make it available for use in other modules.
    
})
export class UsersModule {}




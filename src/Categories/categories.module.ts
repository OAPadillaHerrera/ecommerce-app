

/**
 * This file defines the `CategoriesModule`, which is responsible for 
 * managing operations related to categories within the application. 
 * It integrates database interactions, business logic, and API endpoints 
 * for handling category-related functionality.
 */

import { Module } from '@nestjs/common'; // Import the decorator for defining a NestJS module.
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM integration for database interaction.
import { Categories } from './categories.entity'; // Import the entity representing the 'Categories' table.
import { CategoriesService } from './categories.service'; // Import the service for handling business logic related to categories.
import { CategoriesController } from './categories.controller'; // Import the controller for managing HTTP requests for categories.
import { CategoriesRepository } from './categories.repository'; // Import the repository for abstracting database operations.

@Module ({

  imports: [TypeOrmModule.forFeature ([Categories])], // Import the TypeORM module to connect the Categories entity to the database.
  providers: [CategoriesService, CategoriesRepository], // Register the service and repository as providers for dependency injection.
  controllers: [CategoriesController], // Register the controller to handle HTTP requests related to categories.
  exports: [CategoriesService], // Export the CategoriesService to make it available for other modules.

})

export class CategoriesModule {}

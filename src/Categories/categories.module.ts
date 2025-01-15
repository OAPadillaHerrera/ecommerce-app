

/** 
 
 * This file defines the `CategoriesModule`, a NestJS module responsible 
 * for managing all operations related to categories. It integrates database 
 * interactions, business logic, and API endpoints while ensuring modularity 
 * and reusability across the application.
 
 */

import { Module } from '@nestjs/common'; // Importing NestJS module decorator.
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeORM integration for database handling.
import { Categories } from './categories.entity'; // The entity representing the 'Categories' table in the database.
import { CategoriesService } from './categories.service'; // The service containing business logic for categories.
import { CategoriesController } from './categories.controller'; // The controller managing HTTP requests for category operations.
import { CategoriesRepository } from './categories.repository'; // The repository that abstracts database operations for categories.

@Module ({

  imports: [TypeOrmModule.forFeature ([Categories])], // Connects the `Categories` entity to the database using TypeORM.
  providers: [CategoriesService, CategoriesRepository], // Registers the service and repository for dependency injection.
  controllers: [CategoriesController], // Registers the controller for handling HTTP requests related to categories.
  exports: [CategoriesService], // Exports the `CategoriesService` to be used in other modules.

})

export class CategoriesModule {} // The main module encapsulating all category-related functionalities.


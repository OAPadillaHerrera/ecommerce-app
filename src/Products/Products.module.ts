

import { Module } from '@nestjs/common'; // Import the decorator for defining a NestJS module.
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM module for database integration.
import { Products } from './products.entity'; // Import the entity representing the `Products` table.
import { ProductsRepository } from './products.repository'; // Import the repository for database operations related to products.
import { ProductsService } from './products.service'; // Import the service containing product-related business logic.
import { ProductsController } from './products.controller'; // Import the controller for handling HTTP requests related to products.
import { Categories } from '../Categories/categories.entity'; // Import the entity representing the `Categories` table.
import { CategoriesModule } from '../Categories/categories.module'; // Import the `CategoriesModule` to enable category-related functionality.
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // Import the `CloudinaryModule` for handling cloud-based media storage.

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Products, Categories]), // Register `Products` and `Categories` entities with TypeORM for database operations.
    CategoriesModule, // Import the `CategoriesModule` to manage category relationships.
    CloudinaryModule, // Import the `CloudinaryModule` to enable media uploads and cloud storage.

  ],

  controllers: [ProductsController], // Register the controller for handling HTTP requests related to products.
  providers: [ProductsRepository, ProductsService], // Declare the repository and service as providers for dependency injection.
  exports: [ProductsService], // Export the service to make it available for use in other modules.

})

export class ProductsModule {}

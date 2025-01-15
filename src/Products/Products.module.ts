

/*

  This file defines the ProductsModule, a NestJS module responsible for handling functionality related to products.
  The module integrates various components, including:
  - Entities: Representing database tables.
  - Repositories: Handling database interactions.
  - Services: Containing business logic.
  - Controllers: Managing HTTP requests and responses.
  - External Modules: Providing additional functionality, such as authentication and cloud file storage.

*/

import { Module } from '@nestjs/common'; // Import NestJS's Module decorator to define a module.
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule for integrating TypeORM (database ORM) with NestJS.
import { Products } from './products.entity'; // Import the Products entity, representing the structure of the 'Products' table in the database.
import { ProductsRepository } from './products.repository'; // Import the repository for handling database operations specific to products.
import { ProductsService } from './products.service'; // Import the service containing business logic for managing products.
import { ProductsController } from './products.controller'; // Import the controller that manages HTTP requests for the Products module.
import { Categories } from '../Categories/categories.entity'; // Import the Categories entity, representing the 'Categories' table in the database.
import { CategoriesModule } from '../Categories/categories.module'; // Import the CategoriesModule to integrate category management features.
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // Import the CloudinaryModule for cloud-based media management.
import { AuthModule } from '../auth/auth.module'; // Import the AuthModule for handling authentication and authorization.

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Products, Categories]), // Register the Products and Categories entities with TypeORM to enable database interactions.
    CategoriesModule, // Import the CategoriesModule to use its services and functionality for category management.
    CloudinaryModule, // Import the CloudinaryModule to enable features for uploading and managing files in the cloud.
    AuthModule, // Import the AuthModule to secure endpoints with authentication and authorization mechanisms.

  ],

  controllers: [

    ProductsController, // Specify the ProductsController as the handler for HTTP requests related to products.

  ],

  providers: [

    ProductsRepository, // Register the ProductsRepository for database interactions specific to products.
    ProductsService, // Register the ProductsService, which contains business logic related to managing products.

  ],

  exports: [

    ProductsService, // Export the ProductsService to make it available for use in other modules.
    
  ],

})

export class ProductsModule {} // Define and export the ProductsModule so it can be imported into other parts of the application.

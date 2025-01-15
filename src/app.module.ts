

/** 
 
 * This file defines the `AppModule`, the root module of the application. 
 * It sets up global configurations, integrates database connection settings, 
 * and imports the main feature modules. The module ensures modularity, 
 * scalability, and efficient dependency injection throughout the application.
 
*/

import { Module } from '@nestjs/common'; // Importing the decorator for defining a NestJS module.
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importing the configuration module for environment variables and the service for accessing configurations.
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeORM module for database connection and ORM features.
import { ProductsModule } from './Products/products.module'; // Importing the module that handles product-related operations.
import { AuthModule } from './Auth/auth.module'; // Importing the module for authentication and authorization.
import { UsersModule } from './Users/users.module'; // Importing the module for managing users.
import { CategoriesModule } from './Categories/categories.module'; // Importing the module for managing categories.
import { OrdersModule } from './Orders/orders.module'; // Importing the module for order management.
import { typeOrmConfig } from './config/typeorm'; // Importing the configuration file for TypeORM settings.
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module ({

  imports: [

    ConfigModule.forRoot ({

      isGlobal: true, // Makes the configuration globally available across all modules.
      load: [typeOrmConfig], // Loads the TypeORM configuration file.

    }),

    TypeOrmModule.forRootAsync ({

      inject: [ConfigService], // Injects the ConfigService to access environment variables dynamically.

      useFactory: (configService: ConfigService) => {

        const typeormConfig = configService.get ('typeorm'); // Fetches the TypeORM configuration from environment variables.
        
        if (!typeormConfig || !typeormConfig.type) {

          throw new Error (

            'Database configuration is invalid. Check your .env file and configuration.' // Throws an error if configuration is missing or invalid.

          );

        }

        return {

          ...typeormConfig, // Spreads the fetched configuration.
          retryAttempts: 3, // Number of retry attempts for database connection.
          retryDelay: 3000, // Delay in milliseconds between retry attempts.

        };

      },

    }),

    ProductsModule, // Module for managing products.
    AuthModule, // Module for authentication and user security.
    UsersModule, // Module for managing users and their data.
    CategoriesModule, // Module for managing categories.
    OrdersModule, // Module for handling orders and related operations.
    CloudinaryModule, // This module is responsible for integrating the Cloudinary service into the application,
    // allowing for functionalities such as image and video uploads, transformations, and storage management.

  ],

})

export class AppModule {} // Defines the root module `AppModule`, which brings together all other modules and configurations.

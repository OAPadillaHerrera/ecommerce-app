

/**
 
 * This file defines the `OrdersModule`, which manages all functionality
 * related to orders in the application. Key responsibilities include:
 * - Handling HTTP requests and responses for creating, retrieving, updating, or deleting orders.
 * - Managing database operations for the `Orders` table and related entities (`Users`, `Products`, `OrderDetails`).
 * - Encapsulating business logic for processing orders within the `OrdersService`.
 
 */

import { Module } from "@nestjs/common"; // Import the decorator for defining a NestJS module.
import { TypeOrmModule } from "@nestjs/typeorm"; // Import TypeORM module for database integration.
import { OrdersController } from "./orders.controller"; // Import the controller to handle HTTP requests related to orders.
import { OrdersService } from "./orders.service"; // Import the service containing business logic for orders.
import { OrdersRepository } from "./orders.repository"; // Import the repository for database operations specific to orders.
import { Orders } from "./orders.entity"; // Import the entity representing the `Orders` table in the database.
import { Users } from "../Users/users.entity"; // Import the entity representing the `Users` table, related to orders.
import { Products } from "../Products/products.entity"; // Import the entity representing the `Products` table, related to orders.
import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Import the entity representing the `OrderDetails` table for order details.
import { AuthModule } from "src/auth/auth.module"; // Import the AuthModule for securing order-related endpoints.

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Orders, Users, Products, OrderDetails]), // Register entities to enable database operations for orders and related tables.
    AuthModule, // Import the AuthModule to protect routes and manage authentication for order-related operations.

  ],

  providers: [

    OrdersService, // Provide the OrdersService to encapsulate business logic for managing orders.
    OrdersRepository, // Provide the OrdersRepository to handle database queries related to orders.

  ],

  controllers: [

    OrdersController, // Register the OrdersController to manage HTTP routes for orders (e.g., /orders).

  ],

})

export class OrdersModule {} // Export the OrdersModule to make it available for use in the application.

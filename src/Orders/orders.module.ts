

/**
 * This file defines the `OrdersModule`, which manages all functionality
 * related to orders in the application. It integrates database operations,
 * business logic, and HTTP request handling for orders, as well as related
 * entities like users, products, and order details.
 */

import { Module } from "@nestjs/common"; // Import the decorator for defining a NestJS module.
import { TypeOrmModule } from "@nestjs/typeorm"; // Import TypeORM module for database integration.
import { OrdersController } from "./orders.controller"; // Import the controller to handle HTTP requests related to orders.
import { OrdersService } from "./orders.service"; // Import the service containing business logic for orders.
import { OrdersRepository } from "./orders.repository"; // Import the repository for database operations specific to orders.
import { Orders } from "./orders.entity"; // Import the entity representing the `Orders` table.
import { Users } from "../Users/users.entity"; // Import the entity representing the `Users` table.
import { Products } from "../Products/products.entity"; // Import the entity representing the `Products` table.
import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Import the entity representing the `OrderDetails` table.
import { AuthModule } from "src/auth/auth.module";

@Module ({

  imports: [

    TypeOrmModule.forFeature ([Orders, Users, Products, OrderDetails]), // Register entities with TypeORM for database operations.
    AuthModule,
  ],

  providers: [OrdersService, OrdersRepository], // Declare the service and repository as providers for dependency injection.
  controllers: [OrdersController], // Register the controller for handling HTTP requests related to orders.

})

export class OrdersModule {}



/**
 
 * This file defines the `OrdersController` class, which handles order-related operations and routes.
 * It provides endpoints to retrieve a specific order and create a new order. Authentication and validation 
 * are applied to ensure secure and consistent data handling.
 
*/

import { Controller, Get, Post, Body, Param, BadRequestException, ParseUUIDPipe, UseGuards, Put } from "@nestjs/common";

import { OrdersService } from "./orders.service"; // Service for order-related business logic.
import { CreateOrderDto, validateProducts } from "./dtos/CreateOrderDto"; // DTO and validation for orders.
import { AuthGuard } from "src/Auth/AuthGuard"; // Guard for authentication.
import { ApiBearerAuth } from "@nestjs/swagger"; // Swagger decorator for API authentication.

@Controller ("orders") // Controller for order routes.

export class OrdersController {

  constructor (private readonly ordersService: OrdersService) {} // Injects OrdersService.

  @ApiBearerAuth ()
  @Get (':id') // Endpoint: GET /orders/:id.
  @UseGuards (AuthGuard) // Requires authentication.

  async getOrder (@Param ('id', ParseUUIDPipe) id: string): Promise<any> {

    return this.ordersService.getOrder (id); // Retrieves order by ID.

  }

  @ApiBearerAuth ()
  @Post () // Endpoint: POST /orders.
  @UseGuards (AuthGuard) // Requires authentication.

  async addOrder (@Body () createOrderDto: CreateOrderDto): Promise<any> {

    try {

      validateProducts (createOrderDto.products); // Validates product data.

      return this.ordersService.addOrder (

        createOrderDto.userId, // User ID for the order.
        createOrderDto.products.map ((p) => p.id), // Extracts product IDs.

      );

    } catch (error) {

      throw new BadRequestException (error.message); // Handles validation errors.

    }

  }

  @ApiBearerAuth ()
  @Put ('estado/:id') 
  @UseGuards (AuthGuard) 

  async orderDelete (@Param ('id', ParseUUIDPipe) id: string): Promise<any> {

    return this.ordersService.orderDelete (id); 

  }

}






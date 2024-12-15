

/**
 * This file defines the `OrdersController` class, which handles all order-related 
 * operations and routes in the application.
 * 
 * It provides endpoints to retrieve a specific order and create a new order.
 */

import { Controller, Get, Post, Body, Param, BadRequestException, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, validateProducts } from "./dtos/CreateOrderDto";
import { AuthGuard } from "src/Auth/AuthGuard";

@Controller ("orders")
export class OrdersController {

  /**
   * Initializes the `OrdersController` with an instance of `OrdersService`.
   * 
   * @param ordersService - Service for managing order-related business logic.
   */

  constructor (private readonly ordersService: OrdersService) {}

  /**
   * Handles `GET /orders/:id`.
   * 
   * Retrieves a specific order by its ID. Requires authentication.
   * 
   * @param id - The ID of the order to retrieve.
   * @returns The order details with associated information.
   */

  @Get (':id')
  @UseGuards (AuthGuard)

  async getOrder (@Param ('id', ParseUUIDPipe) id: string): Promise<any> {

    return this.ordersService.getOrder(id);

  }
  
  /**
   * Handles `POST /orders`.
   * 
   * Creates a new order. Requires authentication and validates the product data.
   * 
   * @param createOrderDto - The DTO containing user ID and product details for the order.
   * @returns A confirmation of the created order.
   * @throws BadRequestException if product validation fails.
   */

  @Post ()

  @UseGuards (AuthGuard)

  async addOrder (@Body () createOrderDto: CreateOrderDto): Promise<any> {

    try {

      validateProducts (createOrderDto.products);

      return this.ordersService.addOrder (

        createOrderDto.userId, 
        createOrderDto.products.map ((p) => p.id),

      );

    } catch (error) {

      throw new BadRequestException (error.message);

    }

  }

}







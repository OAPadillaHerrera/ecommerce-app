

import { Controller, Get, Post, Body, Param, BadRequestException, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, validateProducts } from "./dtos/CreateOrderDto";
import { AuthGuard } from "src/Auth/AuthGuard";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Obtiene una orden por su ID
   * @param id ID de la orden
   * @returns Orden con los detalles asociados
   */

    @Get(':id')
    @UseGuards (AuthGuard)
    
    async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
      return this.ordersService.getOrder(id);
    }
    
    @Post()
    @UseGuards (AuthGuard)
    async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
      try {
        validateProducts(createOrderDto.products);
        return this.ordersService.addOrder(createOrderDto.userId, createOrderDto.products.map((p) => p.id));
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    
    }
  }











import { Controller, Get, Post, Body, Param, BadRequestException } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.entity";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Obtiene una orden por su ID
   * @param id ID de la orden
   * @returns Orden con los detalles asociados
   */
  @Get(":id")
  async getOrder(@Param("id") id: string): Promise<Orders> {
    try {
      if (!id || typeof id !== "string") {
        throw new BadRequestException("The 'id' parameter is required and must be a string.");
      }
      return await this.ordersService.getOrder(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Crea una nueva orden para un usuario
   * @param createOrderData Objeto con el ID del usuario y los productos
   * @returns Orden creada con detalles
   */
  @Post()
  async addOrder(
    @Body() createOrderData: { userId: string; products: { id: string }[] }
  ): Promise<Orders> {
    const { userId, products } = createOrderData;

    // Validaciones básicas
    if (!userId || typeof userId !== "string") {
      throw new BadRequestException("The 'userId' field is required and must be a string.");
    }

    if (!Array.isArray(products) || products.length === 0) {
      throw new BadRequestException("The 'products' field must be a non-empty array.");
    }

    if (!products.every((product) => typeof product.id === "string" && product.id)) {
      throw new BadRequestException(
        "Each product must be an object with a valid 'id' field of type string."
      );
    }

    try {
      return await this.ordersService.addOrder(userId, products);
    } catch (error) {
      throw new BadRequestException(`Failed to create order: ${error.message}`);
    }
  }
}







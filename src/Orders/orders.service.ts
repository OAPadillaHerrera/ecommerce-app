

import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

    // Obtener una orden con gestión de errores específica
  async getOrder(id: string): Promise<any> {
    // Validación del ID si el ValidationPipe no lo hace
    if (!id || id.trim() === '') {
      throw new NotFoundException('El ID de la orden no puede estar vacío.');
    }

    const order = await this.ordersRepository.getOrder(id);

    // Si no se encuentra la orden, lanzar excepción específica
    if (!order) {
      throw new NotFoundException(`Orden con el ID ${id} no encontrada.`);
    }

    // Construir y devolver la respuesta filtrada
    const filteredUser = {
      id: order.users.id,
      name: order.users.name,
      email: order.users.email,
    };

    const filteredProducts = order.orderDetails.products;

    return {
      id: order.id,
      date: order.date,
      totalPrice: order.totalPrice,
      orderDetailsId: order.orderDetailsId,
      users: filteredUser,
      orderDetails: {
        id: order.orderDetails.id,
        price: order.orderDetails.price,
        products: filteredProducts, // Productos con stock > 0
      },
    };
  }

    async addOrder(userId: string, products: string[]): Promise<any> {
      const newOrder = await this.ordersRepository.addOrder(userId, products);
  
      // Construcción de respuesta filtrada
      const filteredUser = {
        id: newOrder.users.id,
        name: newOrder.users.name,
        email: newOrder.users.email,
      };
  
      const filteredProducts = newOrder.orderDetails.products;
  
      return {
        id: newOrder.id,
        date: newOrder.date,
        totalPrice: newOrder.totalPrice,
        orderDetailsId: newOrder.orderDetailsId,
        users: filteredUser,
        orderDetails: {
          id: newOrder.orderDetails.id,
          price: newOrder.orderDetails.price,
          products: filteredProducts,
        },
      };
    }
  }







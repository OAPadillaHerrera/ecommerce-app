

import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  // Obtener una orden y filtrar productos en la respuesta
  async getOrder(id: string): Promise<any> {
    try {
      const order = await this.ordersRepository.getOrder(id);
      if (!order) throw new Error("Order not found");

      // Construir una respuesta filtrada
      const filteredUser = {
        id: order.users.id,
        name: order.users.name,
        email: order.users.email,
      };

      const filteredProducts = order.orderDetails.products;

      const filteredOrder = {
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

      return filteredOrder;
    } catch (error) {
      throw new Error(`Error obtaining the order: ${error.message}`);
    }
  }

  // Crear una orden y filtrar productos en la respuesta
  async addOrder(userId: string, products: { id: string }[]): Promise<any> {
    try {
      const productIds = products.map((product) => product.id);
      const newOrder = await this.ordersRepository.addOrder(userId, productIds);

      const filteredUser = {
        id: newOrder.users.id,
        name: newOrder.users.name,
        email: newOrder.users.email,
      };

      const filteredProducts = newOrder.orderDetails.products;

      const filteredOrder = {
        id: newOrder.id,
        date: newOrder.date,
        totalPrice: newOrder.totalPrice,
        orderDetailsId: newOrder.orderDetailsId,
        users: filteredUser,
        orderDetails: {
          id: newOrder.orderDetails.id,
          price: newOrder.orderDetails.price,
          products: filteredProducts, // Productos con stock > 0
        },
      };

      return filteredOrder;
    } catch (error) {
      throw new Error(`Error at creating order: ${error.message}`);
    }
  }
}





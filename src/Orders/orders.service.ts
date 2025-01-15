

/* 

This file defines the `OrdersService` class, which manages order-related operations in a NestJS application. 
It interacts with `OrdersRepository` to retrieve, add, and manage orders. Error handling and data filtering
are implemented to ensure clean and clear responses.

*/

import { Injectable, NotFoundException } from "@nestjs/common"; // Import Injectable decorator and NotFoundException from NestJS.
import { OrdersRepository } from "./orders.repository"; // Import OrdersRepository for managing order data.

@Injectable () // Mark this class as a service in the NestJS dependency injection system.

export class OrdersService {

  constructor (private readonly ordersRepository: OrdersRepository) {} // Inject OrdersRepository.

  async getOrder (id: string): Promise<any> { // Method to retrieve an order by ID.

    if (!id || id.trim () === '') { // Validate that the ID is not empty.

      throw new NotFoundException ('The ID order cannot be empty.'); // Throw exception for empty ID.

    }

    const order = await this.ordersRepository.getOrder (id); // Fetch the order by ID.

    if (!order) { // If order is not found.

      throw new NotFoundException(`Order with ID ${id} not found.`); // Throw specific exception.

    }

    const filteredUser = { // Extract and filter user details.

      id: order.users.id, // User ID.
      name: order.users.name, // User name.
      email: order.users.email, // User email.

    };

    const filteredProducts = order.orderDetails.products; // Extract products from order details.

    return { // Build and return the filtered order response.

      id: order.id, // Order ID.
      date: order.date, // Order date.
      totalPrice: order.totalPrice, // Total price of the order.
      orderDetailsId: order.orderDetailsId, // Order details ID.
      users: filteredUser, // Filtered user details.

      orderDetails: { // Filtered order details.

        id: order.orderDetails.id, // Order details ID.
        price: order.orderDetails.price, // Price from order details.
        products: filteredProducts, // Products in the order.

      },

    };

  }

  async addOrder (userId: string, products: string[]): Promise<any> { // Method to add a new order.

    const newOrder = await this.ordersRepository.addOrder (userId, products); // Add order using the repository.

    const filteredUser = { // Extract and filter user details.

      id: newOrder.users.id, // User ID.
      name: newOrder.users.name, // User name.
      email: newOrder.users.email, // User email.

    };

    const filteredProducts = newOrder.orderDetails.products; // Extract products from order details.

    return { // Build and return the filtered new order response.

      id: newOrder.id, // New order ID.
      date: newOrder.date, // Order date.
      totalPrice: newOrder.totalPrice, // Total price of the order.
      orderDetailsId: newOrder.orderDetailsId, // Order details ID.
      users: filteredUser, // Filtered user details.

      orderDetails: { // Filtered order details.
        id: newOrder.orderDetails.id, // Order details ID.
        price: newOrder.orderDetails.price, // Price from order details.
        products: filteredProducts, // Products in the order.

      },

    };

  }
  
}








/* 

This file defines the `OrdersRepository` class, which manages interactions with the `Orders` entity in a NestJS application. 
It uses TypeORM to handle complex database operations such as transactions and relations. The repository also manages 
associations with users, products, and order details, ensuring robust error handling and data consistency.

*/

import { InjectRepository } from "@nestjs/typeorm"; // Decorator to inject a TypeORM repository.
import { Repository, In, MoreThan, DataSource } from "typeorm"; // Tools for database interactions with TypeORM.
import { Orders } from "./orders.entity"; // Entity representing the orders table.
import { Users } from "../Users/users.entity"; // Entity representing the users table.
import { Products } from "../Products/products.entity"; // Entity representing the products table.
import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Entity representing the order details table.
import { Injectable, NotFoundException } from "@nestjs/common"; // Decorators and exceptions for creating a service.

@Injectable () // Marks this class as injectable for dependency injection.

export class OrdersRepository {

  constructor (

    private readonly dataSource: DataSource, // DataSource to manage manual transactions with QueryRunner.
    @InjectRepository (Orders)

    private readonly ordersRepository: Repository<Orders>, // Repository for interacting with the orders table.

  ) {}

  async getOrder (id: string): Promise<Orders> { // Method to fetch an order by ID.

    if (!id) { // Validate the ID (optional, handled by Pipes in controllers).

      throw new Error ('Invalid provided ID'); // Throw an error if ID is invalid.

    }

    const order = await this.ordersRepository.findOne ({ // Find an order by ID.

      where: { id }, // Search condition: order ID.
      relations: ['users', 'orderDetails', 'orderDetails.products'], // Include related users, order details, and products.

    });

    if (!order) { // If the order is not found.

      throw new NotFoundException (`An order with the ID ${id} was not found`); // Throw a not found exception.

    }

    if (order.orderDetails?.products) { // If products are related to the order.

      order.orderDetails.products = order.orderDetails.products.filter ( // Filter out products with stock > 0.

        (product) => product.stock > 0,

      );

    }

    return order; // Return the complete order with filtered products.

  }

  async addOrder (userId: string, productIds: string[]): Promise<Orders> { // Method to create a new order.

    const queryRunner = this.dataSource.createQueryRunner (); // Create a QueryRunner for managing transactions.
    await queryRunner.connect (); // Establish a connection.
    await queryRunner.startTransaction (); // Start a new transaction.

    try {

      const user = await queryRunner.manager.findOne (Users, { where: { id: userId } }); // Find the user by ID.

      if (!user) { // If the user is not found.

        throw new Error ("User not found"); // Throw an error.

      }

      const products = await queryRunner.manager.find (Products, { // Find products with matching IDs and stock > 0.
        where: { id: In (productIds), stock: MoreThan(0) }, // Search condition: IDs and stock.

      });

      if (products.length === 0) { // If no products have sufficient stock.

        throw new Error ("No product have enough stock"); // Throw an error.

      }

      const order = new Orders (); // Create a new order instance.
      order.date = new Date (); // Set the current date.
      order.totalPrice = products.reduce ((sum, product) => sum + Number(product.price), 0); // Calculate total price.
      order.users = user; // Assign the user to the order.

      const savedOrder = await queryRunner.manager.save (Orders, order); // Save the order in the database.

      const orderDetails = new OrderDetails (); // Create a new order details instance.
      orderDetails.price = savedOrder.totalPrice; // Set the total price.
      orderDetails.orders = savedOrder; // Link the order details to the order.

      const savedOrderDetails = await queryRunner.manager.save (OrderDetails, orderDetails); // Save the order details.

      savedOrder.orderDetailsId = savedOrderDetails.id; // Link the order to its details.
      await queryRunner.manager.save (Orders, savedOrder); // Save the updated order.

      const orderDetailsProductRelations = products.map ((product) => ({ // Create product-orderDetails relations.

        productsId: product.id, // Product ID.
        orderDetailsId: savedOrderDetails.id, // Order details ID.

      }));

      await queryRunner.manager // Insert the relations into the database.

        .createQueryBuilder ()
        .insert ()
        .into ('products_order_details_order_details') // Relation table.
        .values (orderDetailsProductRelations)
        .execute ();

      for (const product of products) { // Reduce the stock of each product.

        product.stock -= 1; // Decrease stock by 1.
        await queryRunner.manager.save (Products, product); // Save the updated product.
      }

      const savedOrderWithRelations = await queryRunner.manager.findOne (Orders, { // Fetch the saved order with relations.

        where: { id: savedOrder.id },
        relations: ['users', 'orderDetails', 'orderDetails.products'], // Include related data.

      });

      if (!savedOrderWithRelations) { // If the saved order cannot be loaded.

        throw new Error ("Order with relations could not be loaded"); // Throw an error.

      }

      await queryRunner.commitTransaction (); // Commit the transaction.

      if (savedOrderWithRelations.orderDetails?.products) { // Filter out products with stock > 0.

        savedOrderWithRelations.orderDetails.products = savedOrderWithRelations.orderDetails.products.filter (

          (product) => product.stock > 0,

        );

      }

      return savedOrderWithRelations; // Return the saved order with relations.

    } catch (error) { // Handle any errors during the transaction.

      await queryRunner.rollbackTransaction (); // Rollback the transaction.
      throw new Error (`Order could not be created: $${error.message}`); // Throw an error with the message.

    } finally {

      await queryRunner.release (); // Release the QueryRunner.

    }

  }

}

      
      
      
      
      







/* Importa decoradores y herramientas necesarias para trabajar con TypeORM y NestJS.*/
import { InjectRepository } from "@nestjs/typeorm"; // Decorador para inyectar un repositorio TypeORM en un servicio.
import { Repository, In, MoreThan, DataSource } from "typeorm"; // Clases y operadores para interactuar con la base de datos usando TypeORM.

/* Importa las entidades necesarias para interactuar con las tablas relacionadas.*/
import { Orders } from "./orders.entity"; // Entidad que representa la tabla de órdenes.
import { Users } from "../Users/users.entity"; // Entidad que representa la tabla de usuarios.
import { Products } from "../Products/products.entity"; // Entidad que representa la tabla de productos.
import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Entidad que representa la tabla de detalles de órdenes.

/* Importa decoradores y utilidades de NestJS para crear servicios.*/
import { Injectable, NotFoundException } from "@nestjs/common"; // Decorador que marca una clase como inyectable, permitiendo su uso en otros componentes.

@Injectable() // Marca esta clase como un servicio inyectable en el ecosistema de NestJS.
export class OrdersRepository {
  constructor(
    private readonly dataSource: DataSource, // DataSource para manejar transacciones manuales con QueryRunner.

    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>, // Repositorio para interactuar con la tabla de órdenes en la base de datos.
  ) {}
    
      async getOrder(id: string): Promise<Orders> {
        // Validar el formato del UUID (opcional, ya manejado por Pipes en los controladores)
        if (!id) {
          throw new Error('El ID proporcionado es inválido.');
        }
    
        const order = await this.ordersRepository.findOne({
          where: { id },
          relations: ['users', 'orderDetails', 'orderDetails.products'], // Relaciones necesarias
        });
    
        // Manejo de caso en que no se encuentre la orden
        if (!order) {
          throw new NotFoundException(`No se encontró una orden con el ID ${id}.`);
        }
    
        // Filtrar productos con stock > 0
        if (order.orderDetails?.products) {
          order.orderDetails.products = order.orderDetails.products.filter(
            (product) => product.stock > 0,
          );
        }
    
        return order; // Devuelve la orden completa
      }
    
    async addOrder(userId: string, productIds: string[]): Promise<Orders> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
    
      try {
        const user = await queryRunner.manager.findOne(Users, { where: { id: userId } });
        if (!user) {
          throw new Error("Usuario no encontrado.");
        }
    
        const products = await queryRunner.manager.find(Products, {
          where: { id: In(productIds), stock: MoreThan(0) },
        });
    
        if (products.length === 0) {
          throw new Error("Ningún producto tiene stock suficiente.");
        }
    
        // Lógica de creación de la orden, detalles y relaciones (igual que antes).
        const order = new Orders();
        order.date = new Date();
        order.totalPrice = products.reduce((sum, product) => sum + Number(product.price), 0);
        order.users = user;
    
        const savedOrder = await queryRunner.manager.save(Orders, order);
    
        const orderDetails = new OrderDetails();
        orderDetails.price = savedOrder.totalPrice;
        orderDetails.orders = savedOrder;
    
        const savedOrderDetails = await queryRunner.manager.save(OrderDetails, orderDetails);
    
        savedOrder.orderDetailsId = savedOrderDetails.id;
        await queryRunner.manager.save(Orders, savedOrder);
    
        const orderDetailsProductRelations = products.map((product) => ({
          productsId: product.id,
          orderDetailsId: savedOrderDetails.id,
        }));
    
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('products_order_details_order_details')
          .values(orderDetailsProductRelations)
          .execute();
    
        for (const product of products) {
          product.stock -= 1;
          await queryRunner.manager.save(Products, product);
        }
    
        const savedOrderWithRelations = await queryRunner.manager.findOne(Orders, {
          where: { id: savedOrder.id },
          relations: ['users', 'orderDetails', 'orderDetails.products'],
        });
    
        if (!savedOrderWithRelations) {
          throw new Error("No se pudo cargar la orden con sus relaciones.");
        }
    
        await queryRunner.commitTransaction();
    
        if (savedOrderWithRelations.orderDetails?.products) {
          savedOrderWithRelations.orderDetails.products = savedOrderWithRelations.orderDetails.products.filter(
            (product) => product.stock > 0,
          );
        }
    
        return savedOrderWithRelations;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new Error(`No se pudo crear la orden: ${error.message}`);
      } finally {
        await queryRunner.release();
      }
    }    

}



      
      
      
      
      






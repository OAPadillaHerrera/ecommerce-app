
/* Importa decoradores y herramientas necesarias para trabajar con TypeORM y NestJS.*/
import { InjectRepository } from "@nestjs/typeorm"; // Decorador para inyectar un repositorio TypeORM en un servicio.
import { Repository, In, MoreThan, DataSource } from "typeorm"; // Clases y operadores para interactuar con la base de datos usando TypeORM.

/* Importa las entidades necesarias para interactuar con las tablas relacionadas.*/
import { Orders } from "./orders.entity"; // Entidad que representa la tabla de órdenes.
import { Users } from "../Users/users.entity"; // Entidad que representa la tabla de usuarios.
import { Products } from "../Products/products.entity"; // Entidad que representa la tabla de productos.
import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Entidad que representa la tabla de detalles de órdenes.

/* Importa decoradores y utilidades de NestJS para crear servicios.*/
import { Injectable } from "@nestjs/common"; // Decorador que marca una clase como inyectable, permitiendo su uso en otros componentes.

@Injectable() // Marca esta clase como un servicio inyectable en el ecosistema de NestJS.
export class OrdersRepository {
  constructor(
    private readonly dataSource: DataSource, // DataSource para manejar transacciones manuales con QueryRunner.

    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>, // Repositorio para interactuar con la tabla de órdenes en la base de datos.
  ) {}

  /**
   * Recupera una orden por ID, incluyendo sus relaciones:
   * - Usuario relacionado
   * - Detalles de la orden
   * - Productos asociados a los detalles
   * Filtra los productos con `stock > 0`.
   */
  async getOrder(id: string): Promise<Orders | undefined> {
    const order = await this.ordersRepository.findOne({
      where: { id }, // Busca la orden por su ID único.
      relations: ["users", "orderDetails", "orderDetails.products"], // Incluye relaciones necesarias para construir la respuesta completa.
    });

    /* Filtra los productos que tienen `stock > 0` para excluir los productos agotados.*/
    if (order && order.orderDetails?.products) {
      order.orderDetails.products = order.orderDetails.products.filter(
        (product) => product.stock > 0,
      );
    }

    return order; // Devuelve la orden con los productos filtrados.
  }

  /**
   * Crea una nueva orden para un usuario y una lista de productos.
   * - Valida que los productos tienen stock suficiente.
   * - Reduce el stock de los productos seleccionados.
   * - Maneja relaciones entre órdenes, detalles y productos.
   */
  async addOrder(userId: string, productIds: string[]): Promise<Orders> {
    const queryRunner = this.dataSource.createQueryRunner(); // Crea un QueryRunner para manejar transacciones manualmente.
    await queryRunner.connect();
    await queryRunner.startTransaction(); // Inicia la transacción

    try {
      /* Validación: Asegurarse de que se proporcionaron IDs de productos.*/
      if (!productIds || productIds.length === 0) {
        throw new Error("No se han proporcionado IDs de productos.");
      }

      /* Validación: Asegurarse de que el usuario existe en la base de datos.*/
      const user = await queryRunner.manager.findOne(Users, { where: { id: userId } });
      if (!user) {
        throw new Error("Usuario no encontrado.");
      }

      /* Validación: Recuperar productos disponibles con `stock > 0`.*/
      const products = await queryRunner.manager.find(Products, {
        where: { id: In(productIds), stock: MoreThan(0) }, // Filtra productos con stock mayor a 0
      });

      /* Si no hay productos disponibles, lanza un error.*/
      if (products.length === 0) {
        throw new Error("Ningún producto tiene stock suficiente.");
      }

      /* Crear la orden principal.*/
      const order = new Orders();
      order.date = new Date(); // Establece la fecha actual como fecha de la orden.
      order.totalPrice = products.reduce((sum, product) => sum + Number(product.price), 0); // Calcula el precio total.
      order.users = user; // Asocia la orden con el usuario.

      const savedOrder = await queryRunner.manager.save(Orders, order); // Guarda la orden en la base de datos.

      /* Crear detalles de la orden.*/
      const orderDetails = new OrderDetails();
      orderDetails.price = savedOrder.totalPrice; // Precio total de la orden.
      orderDetails.orders = savedOrder; // Asocia los detalles con la orden.

      const savedOrderDetails = await queryRunner.manager.save(OrderDetails, orderDetails); // Guarda los detalles de la orden.

      /* Actualiza la orden con el ID de los detalles.*/
      savedOrder.orderDetailsId = savedOrderDetails.id;
      await queryRunner.manager.save(Orders, savedOrder); // Guarda la orden actualizada.

      /* Crear relaciones en la tabla intermedia `products_order_details_order_details`.*/
      const orderDetailsProductRelations = products.map((product) => ({
        productsId: product.id,
        orderDetailsId: savedOrderDetails.id,
      }));

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('products_order_details_order_details') // Tabla de relaciones entre productos y detalles.
        .values(orderDetailsProductRelations)
        .execute();

      /* Reducir el stock de los productos seleccionados.*/
      for (const product of products) {
        product.stock -= 1; // Resta 1 al stock
        await queryRunner.manager.save(Products, product); // Guarda el producto actualizado.
      }

      /* Recargar la orden con sus relaciones completas.*/
      const savedOrderWithRelations = await queryRunner.manager.findOne(Orders, {
        where: { id: savedOrder.id },
        relations: ["users", "orderDetails", "orderDetails.products"], // Relaciones completas.
      });

      if (!savedOrderWithRelations) {
        throw new Error("No se pudo cargar la orden con sus relaciones.");
      }

      /* Confirmar la transacción si todo salió bien.*/
      await queryRunner.commitTransaction();

      /* Filtrar productos sin stock antes de devolver la orden.*/
      if (savedOrderWithRelations.orderDetails?.products) {
        savedOrderWithRelations.orderDetails.products = savedOrderWithRelations.orderDetails.products.filter(
          (product) => product.stock > 0,
        );
      }

      return savedOrderWithRelations; // Devuelve la orden completa con relaciones y productos filtrados.
    } catch (error) {
      /* Revertir la transacción en caso de error.*/
      await queryRunner.rollbackTransaction();
      throw new Error(`No se pudo crear la orden: ${error.message}`);
    } finally {
      /* Liberar el QueryRunner.*/
      await queryRunner.release();
    }
  }
}



      
      
      
      
      






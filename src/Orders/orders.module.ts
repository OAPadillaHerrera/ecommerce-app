

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { Orders } from "./orders.entity";
import { Users } from "../Users/users.entity";
import { Products } from "../Products/products.entity";
import { OrderDetails } from "../OrderDetails/orderdetails.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails]), 
  ],
  providers: [OrdersService, OrdersRepository], 
  controllers: [OrdersController], 
})
export class OrdersModule {}

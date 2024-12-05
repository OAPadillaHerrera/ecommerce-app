

/**
 * This file defines the `OrderDetails` entity for the database using TypeORM.
 * 
 * The `OrderDetails` entity represents the `orderDetails` table in the database. 
 * It tracks the details of an order, including the associated products, price, 
 * and the relationship with the `Orders` entity.
 */

import { Orders } from "../Orders/orders.entity";
import { Products } from "../Products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity ({

    name: "orderDetails", // Specifies the name of the corresponding database table.
})

export class OrderDetails {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid(); // Unique identifier for the order details, generated as a UUID.
    @Column ("decimal", { precision: 10, scale: 2, nullable: false })
    price: number; // Price for the order details, with up to 10 digits and 2 decimal places, required.
    @OneToOne (() => Orders, (orders) => orders.orderDetails, { nullable: false })
    @JoinColumn ()
    orders: Orders; // One-to-one relationship with the `Orders` entity, required for every order detail.
    @ManyToMany (() => Products, (products) => products.orderDetails, { cascade: true })
    @JoinTable ()
    products: Products[]; // Many-to-many relationship with `Products`. Tracks all products included in the order.
    
}

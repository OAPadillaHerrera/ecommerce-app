

/**
 
 * This file defines the `OrderDetails` entity for the database using TypeORM.
 * 
 * The `OrderDetails` entity represents the `orderDetails` table in the database. 
 * It tracks the details of an order, including the associated products, price, 
 * and the relationship with the `Orders` entity.
 
 */

import { Orders } from "../Orders/orders.entity"; // Importing the `Orders` entity to define the one-to-one relationship with an order.

import { Products } from "../Products/products.entity"; // Importing the `Products` entity to define the many-to-many relationship with products in an order.

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"; // Importing TypeORM decorators to define entity fields, primary key, and relationships.

import { v4 as uuid } from "uuid"; // Importing the `uuid` library to generate unique identifiers for the `id` field.

@Entity ({

    name: "orderDetails", // Specifies the name of the corresponding database table.

})

export class OrderDetails {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid (); // Unique identifier for the order details, generated as a UUID.

    @Column ("decimal", { precision: 10, scale: 2, nullable: false })
    price: number; // Price for the order details, with up to 10 digits and 2 decimal places. This field is required.

    @OneToOne (() => Orders, (orders) => orders.orderDetails, { nullable: false })
    @JoinColumn ()
    orders: Orders; // One-to-one relationship with the `Orders` entity. Each order detail must be associated with an order.

    @ManyToMany (() => Products, (products) => products.orderDetails, { cascade: true })
    @JoinTable ()
    products: Products []; // Many-to-many relationship with the `Products` entity. Tracks all products included in the order.
    
}


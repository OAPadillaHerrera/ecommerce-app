

/**
 
 * This file defines the `Orders` entity for the database using TypeORM.
 * 
 * The `Orders` entity represents the `orders` table in the database. 
 * It includes fields for tracking the order's date, total price, 
 * and relationships with the `Users` and `OrderDetails` entities.
 
*/

import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Importing the `OrderDetails` entity to define relationships for tracking detailed information of orders.

import { Users } from "../Users/users.entity"; // Importing the `Users` entity to define the relationship indicating which user placed the order.

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"; // Importing TypeORM decorators to define entity fields, primary key, and relationships.

import { v4 as uuid } from "uuid"; // Importing the `uuid` library to generate unique identifiers for the `id` field.

@Entity ({

    name: "orders", // Specifies the name of the corresponding database table.

})

export class Orders {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid (); // Unique identifier for the order, generated as a UUID.

    @Column ("date", { nullable: false })
    date: Date; // The date when the order was placed. This field is required.

    @Column ({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number; // Total price of the order, represented with up to 10 digits and 2 decimal places.

    @Column ({ nullable: true })
    orderDetailsId: string; // Explicit column to store the ID of the related order details entity. 

    @ManyToOne (() => Users, (users) => users.orders, { nullable: false })
    @JoinColumn ()
    users: Users; // Many-to-one relationship with the `Users` entity. Many orders can belong to a single user.

    @OneToOne (() => OrderDetails, (orderDetails) => orderDetails.orders, { nullable: true })
    @JoinColumn ()
    orderDetails: OrderDetails; // One-to-one relationship with the `OrderDetails` entity. An order can have associated details.

}



/**
 * This file defines the `Orders` entity for the database using TypeORM.
 * 
 * The `Orders` entity represents the `orders` table in the database. 
 * It includes fields for tracking the order's date, total price, 
 * and relationships with the `Users` and `OrderDetails` entities.
 */

import { OrderDetails } from "../OrderDetails/orderdetails.entity";
import { Users } from "../Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity ({

    name: "orders", // Specifies the name of the corresponding database table.

})

export class Orders {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid (); // Unique identifier for the order, generated as a UUID.
    @Column ("date", { nullable: false })
    date: Date; // The date when the order was placed, required.
    @Column ({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number; // Total price of the order, with up to 10 digits and 2 decimal places.
    @ManyToOne (() => Users, (users) => users.orders, { nullable: false })
    @JoinColumn ()
    users: Users; // Relationship with the `Users` entity: many orders can belong to one user.
    @OneToOne (() => OrderDetails, (orderDetails) => orderDetails.orders, { nullable: true })
    @JoinColumn ()
    orderDetails: OrderDetails; // One-to-one relationship with `OrderDetails`: an order may have associated details.
    @Column ({ nullable: true })
    orderDetailsId: string; // Explicit field to store the ID of the related order details.
    
}

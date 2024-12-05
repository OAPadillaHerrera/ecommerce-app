

/**
 * This file defines the `Users` entity for the database using TypeORM.
 * 
 * The `Users` entity maps the structure of the `users` table in the database.
 * It includes personal information, authentication details, and 
 * relationships with other entities such as `Orders`.
 */

import { Orders } from "../Orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({

    name: "users", // Specifies the name of the corresponding database table.

})

export class Users {

    @PrimaryGeneratedColumn("uuid") 
    id: string = uuid(); // Unique identifier for the user, generated as a UUID.
    @Column({ length: 50, nullable: false })
    name: string; // Full name of the user, required and limited to 50 characters.
    @Column({ length: 50, nullable: false })
    email: string; // Email address of the user, required and limited to 50 characters.
    @Column({ length: 20, nullable: false })
    password: string; // User's password, required and limited to 20 characters.
    @Column("int", { nullable: true })
    phone: number; // Optional phone number of the user.
    @Column({ length: 50, nullable: true })
    country: string; // Optional country of residence.
    @Column("text", { nullable: true })
    address: string; // Optional full address of the user.
    @Column({ length: 50, nullable: true })
    city: string; // Optional city of residence.
    @OneToMany(() => Orders, (orders) => orders.users) 
    orders: Orders[]; // Relationship with the `Orders` entity: one user can have many orders.
    
}




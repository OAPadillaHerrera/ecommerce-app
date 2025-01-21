

/**
 
 * This file defines the `Users` entity for the database using TypeORM.
 *
 * The `Users` entity maps the structure of the `users` table in the database.
 * It includes personal information, authentication details, and optional 
 * contact data. Additionally, it establishes a relationship with the `Orders` entity,
 * reflecting that one user can have multiple orders.
 *
 * Key Details:
 * 
 * - Uses `uuid` for unique user identification.
 * - Defines required fields with constraints like `length` and `nullable`.
 * - Includes optional fields for flexibility.
 * - Establishes a one-to-many relationship with the `Orders` entity.
 
 */

import { Orders } from "../Orders/orders.entity"; // Import the `Orders` entity to establish a relationship with user orders.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"; // Import TypeORM decorators to define the `Users` entity and its properties.
import { v4 as uuid } from "uuid"; // Import the `uuid` library to generate unique identifiers for users.

@Entity ({

    name: "users", // Specifies the corresponding database table name.

})

export class Users {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid (); // A unique identifier for the user, automatically generated as a UUID.

    @Column ({ length: 50, nullable: false })
    name: string; // The full name of the user. Required and limited to 50 characters.

    @Column ({ length: 50, nullable: false })
    email: string; // The user's email address. Required and used for login and communication.

    @Column ({ length: 20, nullable: false })
    password: string; // The user's password. Should be securely hashed in practice. Limited to 20 characters.

    @Column ({ type: "boolean", default: false })
    isAdmin: boolean; // Indicates whether the user has administrative privileges. Defaults to `false`.

    @Column ("int", { nullable: true })
    phone: number; // The user's phone number. 

    @Column ({ length: 50, nullable: true })
    country?: string | undefined; // The user's country of residence. 

    @Column ("text", { nullable: true })
    address: string; // The user's full address. 

    @Column ({ length: 50, nullable: true })
    city?: string | undefined; // The user's city of residence. 

    @OneToMany (() => Orders, (orders) => orders.users)
    orders: Orders []; // Defines a one-to-many relationship with the `Orders` entity. One user can have many orders.
  
    
}

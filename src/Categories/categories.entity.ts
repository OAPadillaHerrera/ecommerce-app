

/**
 * This file defines the `Categories` entity for use with TypeORM.
 * The `Categories` entity represents a table named "categories" in the database,
 * with a one-to-many relationship to the `Products` entity.
 */

import { Products } from "../Products/products.entity"; // Importing the Products entity for relationships
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"; // Importing TypeORM decorators and utilities
import { v4 as uuid } from "uuid"; // Importing the UUID library for generating unique identifiers

@Entity({

    name: "categories" // Specifies the table name in the database as "categories."

})

export class Categories {

    @PrimaryGeneratedColumn("uuid") // Configures this column as a primary key and generates UUIDs.
    id: string = uuid(); // Assigns a default UUID value when a new category is created.
    @Column({ length: 50, nullable: false }) // Configures this column to store strings with a max length of 50 and makes it non-nullable.
    name: string; // Represents the name of the category.

    @OneToMany(() => Products, (products) => products.categories) 
    // Defines a one-to-many relationship between Categories and Products.
    // The "products" property in the Products entity maps this relationship.
    products: Products[]; // Represents a collection of products under this category.
}

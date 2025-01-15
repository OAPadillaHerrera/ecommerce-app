

/**
 
 * This file defines the `Products` entity for the database using TypeORM.
 * 
 * The `Products` entity represents the `products` table in the database. 
 * It includes details about the product, such as its name, description, 
 * price, stock availability, and relationships with other entities like 
 * `Categories` and `OrderDetails`.
 
 */


import { OrderDetails } from "../OrderDetails/orderdetails.entity"; // Importing the `OrderDetails` entity to establish a many-to-many relationship with the `Products` entity.
import { Categories } from "../Categories/categories.entity"; // Importing the `Categories` entity to establish a many-to-one relationship with the `Products` entity.
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; // Importing TypeORM decorators and utilities for defining entity fields and relationships.
import { v4 as uuid } from "uuid"; // Importing the `uuid` library to generate universally unique identifiers for the `id` field.

@Entity ({

    name: "products", // Specifies the name of the corresponding database table.

})

export class Products {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid (); // Unique identifier for the product, automatically generated as a UUID. This ensures global uniqueness.

    @Column ({ length: 50, nullable: false })
    name: string; // Name of the product. It is a required field and its length is limited to a maximum of 50 characters.

    @Column ("text", { nullable: false })
    description: string; // Detailed description of the product. This field is required and has no character limit due to the "text" type.

    @Column ("decimal", { precision: 10, scale: 2, nullable: false })
    price: number; // Price of the product. The `decimal` type allows for precise representation of monetary values, with up to 10 digits and 2 decimal places.

    @Column ("int", { nullable: false })
    stock: number; // Number of items available in stock. This field is required and must be an integer.

    @Column ({ default: "default-image-url.jpg" })
    imgUrl: string; // URL pointing to the product's image. Defaults to "default-image-url.jpg" if no URL is provided.

    @ManyToOne (() => Categories, (categories) => categories.products)
    categories: Categories; // Defines a many-to-one relationship with the `Categories` entity. 
                            // Each product belongs to one category, but a category can have multiple products.

    @ManyToMany (() => OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable ()
    orderDetails: OrderDetails[]; // Defines a many-to-many relationship with the `OrderDetails` entity.
                                  // Each product can appear in multiple order details, and each order detail can include multiple products.
                                  
}


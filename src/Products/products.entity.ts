

/**
 * This file defines the `Products` entity for the database using TypeORM.
 * 
 * The `Products` entity represents the `products` table in the database. 
 * It includes details about the product, such as its name, description, 
 * price, stock availability, and relationships with other entities like 
 * `Categories` and `OrderDetails`.
 */

import { OrderDetails } from "../OrderDetails/orderdetails.entity";
import { Categories } from "../Categories/categories.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({

    name: "products", // Specifies the name of the corresponding database table.
})

export class Products {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid(); // Unique identifier for the product, generated as a UUID.
    @Column({ length: 50, nullable: false })
    name: string; // Name of the product, required and limited to 50 characters.
    @Column("text", { nullable: false })
    description: string; // Detailed description of the product, required.
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number; // Price of the product, required, with up to 10 digits and 2 decimal places.
    @Column("int", { nullable: false })
    stock: number; // Number of items available in stock, required.
    @Column({ default: "default-image-url.jpg" })
    imgUrl: string; // URL of the product's image. Defaults to a placeholder image if not provided.
    @ManyToOne(() => Categories, (categories) => categories.products)
    categories: Categories; // Relationship with the `Categories` entity: many products belong to one category.
    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails[]; // Relationship with `OrderDetails`: many products can belong to many order details.
    
}


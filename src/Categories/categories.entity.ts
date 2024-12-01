

import { Products } from "../Products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity ({

    name: "categories"

})

export class Categories {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid ()

    @Column ({ length: 50, nullable: false })
    name: string;

    @OneToMany (() => Products, (products) => products.categories)
    products: Products [];
    
}


import { OrderDetails } from "../OrderDetails/orderdetails.entity";
import { Categories } from "../Categories/categories.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid"

@Entity ({

    name: "products"

})

export class Products {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid ()

    @Column ({ length: 50, nullable: false })
    name: string;

    @Column ("text", { nullable:  false})
    description: string;

    @Column ("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column ("int", { nullable: false })
    stock: number;

    @Column({ default: "default-image-url.jpg" })
    imgUrl: string;

    @ManyToOne (() => Categories, (categories) => categories.products)
    categories: Categories;

    @ManyToMany (() => OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable ()
    orderDetails: OrderDetails [];

}



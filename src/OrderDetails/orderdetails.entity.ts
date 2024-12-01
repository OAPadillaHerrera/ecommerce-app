

import { Orders } from "../Orders/orders.entity";
import { Products } from "../Products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid"

@Entity ({

    name: "orderDetails"

})

export class OrderDetails {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid ()


    @Column ("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne (() => Orders, (orders) => orders.orderDetails, { nullable: false })
    @JoinColumn ()
    orders: Orders

    @ManyToMany (() => Products, (products) => products.orderDetails, { cascade: true})
    @JoinTable ()
    products: Products [];
    
}
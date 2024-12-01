

import { Orders } from "../Orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity ({

    name: "users"

})

export class Users {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid ()

    @Column ({ length: 50, nullable: false })
    name: string;

    @Column ({ length: 50, nullable: false})
    email: string;

    @Column ({ length: 20, nullable: false })
    password: string;

    @Column ("int", { nullable: true })
    phone: number;

    @Column ({ length: 50, nullable: true })
    country: string;

    @Column ("text", { nullable: true })
    address: string;

    @Column ({ length: 50, nullable: true })
    city: string;

    @OneToMany (() => Orders, (orders) => orders.users)
    orders: Orders [];
    
}



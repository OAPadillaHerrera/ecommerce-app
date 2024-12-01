

import { OrderDetails } from "../OrderDetails/orderdetails.entity";
import { Users } from "../Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid"


@Entity ({

    name: "orders"

})

export class Orders {

    @PrimaryGeneratedColumn ("uuid")
    id: string = uuid ()

   
    @Column ("date", { nullable: false })
    date: Date;

    @Column ({type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @ManyToOne (() => Users, (users) => users.orders, { nullable: false})
    @JoinColumn ()
    users: Users;

    @OneToOne (() => OrderDetails, (orderDetails) => orderDetails.orders, { nullable: true})
    @JoinColumn ()
    orderDetails: OrderDetails;

    @Column({ nullable: true }) // Agrega el campo explícito para almacenar el ID
    orderDetailsId: string;
  
}
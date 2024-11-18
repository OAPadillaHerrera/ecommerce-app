

import { Module } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { ProductsController } from "./Products.controller";

@Module ({

    providers: [ProductsService],
    controllers: [ProductsController]
    
})

export class ProductsModule {}
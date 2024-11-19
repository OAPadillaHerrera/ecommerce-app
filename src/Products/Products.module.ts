

import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./Products.repository";

@Module ({

    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController]
    
})

export class ProductsModule {}


import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { Categories } from "../Categories/categories.entity";
import { CategoriesModule } from "../Categories/categories.module"; // Importar el módulo de categorías
import { ProductsController } from "./products.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Categories]),
    CategoriesModule, // Agregar esta línea
  ],

  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}



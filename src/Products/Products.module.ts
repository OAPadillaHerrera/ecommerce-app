

/*import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { Categories } from "../Categories/categories.entity";
import { CategoriesModule } from "../Categories/categories.module"; // Importar el módulo de categorías
import { ProductsController } from "./products.controller";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CloudinaryConfig } from "../config/cloudinaryConfig";

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Categories]),
    CategoriesModule, // Agregar esta línea
  ],

  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService, CloudinaryConfig, CloudinaryService],
  exports: [ProductsService],
})
export class ProductsModule {}*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Categories } from '../Categories/categories.entity';
import { CategoriesModule } from '../Categories/categories.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // Importa CloudinaryModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Categories]),
    CategoriesModule, // Importa categorías si es necesario
    CloudinaryModule, // Importa el módulo de Cloudinary
  ],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}


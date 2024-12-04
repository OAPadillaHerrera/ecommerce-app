

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { ValidateGuard } from 'src/guards/validate.guard';
import * as path from 'path';
import { UUIDParamDto } from '../dtos/UUIDParamDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/all')
  getProducts() {
    return this.productsService.getProducts();
  }

  /* Obtener productos paginados. */
  @Get()
  @UseGuards(AuthGuard)
  async getPaginatedProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5;

    console.log(`Controller: Page=${pageNumber}, Limit=${limitNumber}`);
    return this.productsService.getPaginatedProducts(pageNumber, limitNumber);
  }

  @Get(':id')
  getProductById(@Param() params: UUIDParamDto) {
    const { id } = params;
    return this.productsService.getProductById(id);
  }

  @Post('/all')
  @UseGuards(AuthGuard, ValidateGuard)
  createProduct(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard, ValidateGuard)
  updateProduct(@Param() params: UUIDParamDto, @Body() updateData: Partial<Product>) {
    const { id } = params;
    return this.productsService.updateProduct(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param() params: UUIDParamDto) {
    const { id } = params;
    return this.productsService.deleteProduct(id);
  }

  @Post('/seeder')
  async seedProducts() {
    console.log('Entrando al endpoint /seeder');

    try {
      const filePath = path.resolve(__dirname, '../../src/Archivo_actividad_3.js');
      const result = await this.productsService.seedProductsFromFile(filePath);
      return result;
    } catch (error) {
      return `Failed to seed products: ${error.message}`;
    }
  }
}

  


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
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { ValidateGuard } from 'src/guards/validate.guard';
import * as path from 'path';
import { UUIDParamDto } from '../dtos/UUIDParamDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileValidationPipe } from '../common/pipes/file-validation.pipe';
import { createProductDto } from './dtos/CreateProductDto';

@Controller('products')
export class ProductsController {
  
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  
  ) {}

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
    async updateProduct(
        @Param() params: UUIDParamDto, // Usa UUIDParamDto para validar el ID.
        @Body() updateData: createProductDto // Usa UpdateProductDto para validar los datos del cuerpo.
    ) {
        const { id } = params; // Extrae el ID del DTO validado.
        return this.productsService.updateProduct(id, updateData); // Pasa el ID y los datos validados al servicio.
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

  @Put('/files/uploadImage/:id')
  @UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
async uploadImageToProduct(
  @Param('id') id: string,
  @UploadedFile(FileValidationPipe) file: Express.Multer.File,
) {
  return this.productsService.uploadProductImage(id, file);
}


}

  
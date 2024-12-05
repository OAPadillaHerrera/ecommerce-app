

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

    @Post('images')
    @UseInterceptors(FileInterceptor('image'))
    async getUserImages(@UploadedFile() file: Express.Multer.File) {
      try {
        if (!file) {
          throw new Error('No se ha recibido ningún archivo');
        }
        console.log('Archivo recibido:', file);
        const result = await this.cloudinaryService.uploadImage(file);
        console.log('Resultado de la subida:', result);
        return result;
      } catch (error) {
        console.error('Error al subir la imagen:', error.message);
        throw new Error('Error al procesar la imagen: ' + error.message);
      }
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

  @Put('/files/uploadImage/:id')
@UseInterceptors(FileInterceptor('file'))
async uploadImageToProduct(
  @Param('id') id: string,
  @UploadedFile(FileValidationPipe) file: Express.Multer.File,
) {
  return this.productsService.uploadProductImage(id, file);
}


}

  
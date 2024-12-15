

  /**
 * This file defines the `ProductsController` class, which handles all product-related
 * operations and routes in the application.
 * 
 * It provides endpoints for CRUD operations, product retrieval, pagination, 
 * seeding products from a file, and uploading product images.
 */

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
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller ('products')

export class ProductsController {
  
  /**
   * Initializes the `ProductsController` with required services.
   * 
   * @param productsService - Handles product-related business logic.
   * @param cloudinaryService - Handles product image uploads.
   */

  constructor (

    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,

  ) {}

  /**
   * Handles `GET /products/all`.
   * 
   * Retrieves all products without pagination.
   * 
   * @returns A list of all products.
   */

  @Get ('/all')

  getProducts () {

    return this.productsService.getProducts();

  }

  /**
   * Handles `GET /products`.
   * 
   * Retrieves a paginated list of products. Requires authentication.
   * 
   * @param page - Page number for pagination.
   * @param limit - Number of products per page.
   * @returns A paginated list of products.
   */

  @Get ()
  @UseGuards (AuthGuard)

  async getPaginatedProducts (

    @Query('page') page: string,
    @Query('limit') limit: string,

  ) {

    const pageNumber = parseInt (page, 10) || 1;
    const limitNumber = parseInt (limit, 10) || 5;

    console.log (`Controller: Page=${pageNumber}, Limit=${limitNumber}`);
    return this.productsService.getPaginatedProducts(pageNumber, limitNumber);

  }

  /**
   * Handles `GET /products/:id`.
   * 
   * Retrieves a product by its ID.
   * 
   * @param params - Contains the product's ID.
   * @returns The product object.
   */

  @Get (':id')
  getProductById (@Param () params: UUIDParamDto) {

    const { id } = params;
    return this.productsService.getProductById (id);
  }

  /**
   * Handles `POST /products/all`.
   * 
   * Creates a new product. Requires authentication and validation.
   * 
   * @param product - Product data to create.
   * @returns The newly created product.
   */

  @Post ('/all')
  @UseGuards(AuthGuard, ValidateGuard)

  createProduct (@Body () product: Product) {

    return this.productsService.createProduct 
    (product);

  }

  /**
   * Handles `PUT /products/:id`.
   * 
   * Updates an existing product. Requires `Admin` role and validation.
   * 
   * @param params - Contains the product's ID.
   * @param updateData - The updated product data.
   * @returns The updated product.
   */

  @Put (':id')
  @Roles (Role.Admin) 
  @UseGuards (AuthGuard, ValidateGuard, RolesGuard)

  async updateProduct (

      @Param () params: UUIDParamDto, 
      @Body () updateData: createProductDto, 

  ) {

      const { id } = params; 
      return this.productsService.updateProduct (id, updateData); 

  }

  /**
   * Handles `DELETE /products/:id`.
   * 
   * Deletes a product by its ID. Requires authentication.
   * 
   * @param params - Contains the product's ID.
   * @returns Confirmation of the deletion.
   */

  @Delete (':id')
  @UseGuards (AuthGuard)

  deleteProduct (@Param () params: UUIDParamDto) {

    const { id } = params;
    return this.productsService.deleteProduct(id);

  }

  /**
   * Handles `POST /products/seeder`.
   * 
   * Seeds the database with product data from a specified file.
   * 
   * @returns A success message or an error message.
   */

  @Post ('/seeder')
  async seedProducts () {

    console.log ('Entering to the endpoint /seeder');

    try {

      const filePath = path.resolve (__dirname, '../../src/Archivo_actividad_3.js');
      const result = await this.productsService.seedProductsFromFile (filePath);
      return result;

    } catch (error) {

      return `Failed to seed products: ${error.message}`;

    }

  }

  /**
   * Handles `PUT /products/files/uploadImage/:id`.
   * 
   * Uploads an image for a product. Requires authentication and file validation.
   * 
   * @param id - The product's ID.
   * @param file - The uploaded file.
   * @returns The product with the updated image.
   */

  @Put ('/files/uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor ('file'))

  async uploadImageToProduct (

    @Param('id') id: string,
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,

  ) {

    return this.productsService.uploadProductImage(id, file);

  }
  
}

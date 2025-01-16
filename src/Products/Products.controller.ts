

/**
 
 * This file defines the `ProductsController` class, which handles product-related operations and routes.
 * It provides endpoints for CRUD operations, product retrieval, pagination, seeding products from a file, 
 * and uploading product images. The controller includes authentication, validation, and role-based access 
 * control for secure operations.
 
 */

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service'; // Service for product-related business logic.
import { Product } from './product.interface'; // Interface for Product structure.
import { AuthGuard } from 'src/Auth/AuthGuard'; // Guard for authentication.
import { ValidateGuard } from 'src/guards/validate.guard'; // Guard for validation.
import * as path from 'path'; // Node.js path module for file operations.
import { UUIDParamDto } from '../dtos/UUIDParamDto'; // DTO for validating UUID parameters.
import { FileInterceptor } from '@nestjs/platform-express'; // Interceptor for handling file uploads.
import { FileValidationPipe } from '../common/pipes/file-validation.pipe'; // Pipe for file validation.
import { createProductDto } from './dtos/CreateProductDto'; // DTO for product creation.
import { Role } from 'src/roles.enum'; // Enum for roles.
import { RolesGuard } from 'src/guards/roles.guard'; // Guard for role-based access.
import { Roles } from 'src/decorators/roles.decorators'; // Decorator for role-based access control.
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger'; // Swagger decorators.

@Controller ('products') // Controller for product routes.

export class ProductsController {
  
  constructor (

    private readonly productsService: ProductsService, // Injects ProductsService.
    
  ) {}

  @Get ('/all') // Endpoint: GET /products/all.

  getProducts () {

    return this.productsService.getProducts (); // Fetches all products.

  }

  @ApiBearerAuth ()
  @Get () // Endpoint: GET /products with pagination.
  /*@UseGuards (AuthGuard) // Requires authentication.*/

  async getPaginatedProducts (

    @Query ('page') page: string, // Page number query.
    @Query ('limit') limit: string, // Items per page query.

  ) {

    const pageNumber = parseInt (page, 10) || 1; // Default page number.
    const limitNumber = parseInt (limit, 10) || 5; // Default limit. 
    return this.productsService.getPaginatedProducts (pageNumber, limitNumber);

  }

  @Get (':id') // Endpoint: GET /products/:id.

  getProductById (@Param () params: UUIDParamDto) {

    const { id } = params; // Extracts product ID.
    return this.productsService.getProductById (id); // Fetches product by ID.

  }

  @ApiBearerAuth ()
  @Post ('/all') // Endpoint: POST /products/all.
  @UseGuards (AuthGuard, ValidateGuard) // Requires authentication and validation.
  @ApiBody ({ type: createProductDto }) // Swagger body schema.

  createProduct (@Body () product: createProductDto) {

    const productToCreate: Omit<Product, 'id'> = {

      name: product.name || '', // Default name.
      description: product.description || '', // Default description.
      price: product.price || 0, // Default price.
      stock: product.stock || 0, // Default stock.
      imgUrl: product.imgUrl || '', // Default image URL.
      categories: product.categories || '', // Default categories.

    };

    return this.productsService.createProduct (productToCreate); // Creates a new product.

  }

  @ApiBearerAuth ()
  @Put (':id') // Endpoint: PUT /products/:id.
  @Roles (Role.Admin) // Requires Admin role.
  @UseGuards (AuthGuard, ValidateGuard, RolesGuard) // Authentication and role validation.

  async updateProduct (

    @Param () params: UUIDParamDto, // Product ID parameter.
    @Body () updateData: createProductDto, // Updated product data.

  ) {

    const { id } = params; // Extracts product ID.
    return this.productsService.updateProduct (id, updateData); // Updates product.

  }

  @ApiBearerAuth ()
  @Delete (':id') // Endpoint: DELETE /products/:id.
  @UseGuards (AuthGuard) // Requires authentication.

  deleteProduct (@Param () params: UUIDParamDto) {

    const { id } = params; // Extracts product ID.
    return this.productsService.deleteProduct (id); // Deletes product.

  }

  @Post ('/seeder') // Endpoint: POST /products/seeder.
  @UseGuards (AuthGuard) // Requires authentication.


  async seedProducts () {

    try {

      const filePath = path.resolve (__dirname, '../../src/Archivo_actividad_3.js'); // File path for seeding.
      const result = await this.productsService.seedProductsFromFile (filePath); // Seeds products.
      return result;

    } catch (error) {

      return `Failed to seed products: ${error.message}`; // Handles errors.

    }

  }

  @ApiBearerAuth ()
  @Put ('/files/uploadImage/:id') // Endpoint: PUT /products/files/uploadImage/:id.
  @UseGuards (AuthGuard) // Requires authentication.
  @UseInterceptors (FileInterceptor ('file')) // Intercepts file uploads.
  @ApiConsumes ('multipart/form-data') // Consumes multipart/form-data.

  @ApiBody ({

    schema: {

      type: 'object',

      properties: {

        file: {

          type: 'string',
          format: 'binary', // Binary format for file upload.

        },

      },

    },

  })

  async uploadImageToProduct (

    @Param ('id') id: string, // Product ID parameter.
    @UploadedFile (FileValidationPipe) file: Express.Multer.File, // Validates uploaded file.

  ) {

    return this.productsService.uploadProductImage (id, file); // Uploads product image.

  }
  
}

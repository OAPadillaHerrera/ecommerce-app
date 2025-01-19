

/**
 
 * This file defines the `createProductDto` class for validating product creation input data.
 * 
 * The class uses `class-validator` decorators to enforce validation rules for each field,
 * and `@ApiProperty` decorators to enhance Swagger API documentation. Each property is optional
 * but includes validation constraints for ensuring correctness and consistency.
 
 */

import { ApiProperty} from '@nestjs/swagger'; // Decorator for adding metadata to Swagger API documentation.

import {

  IsString, // Validates that a property is a string.
  IsOptional, // Marks a property as optional.
  IsNumber, // Validates that a property is a number.
  IsUrl, // Validates that a property is a valid URL.
  IsInt, // Validates that a property is an integer.
  Min, // Ensures that a number is greater than or equal to a specified minimum.
  IsPositive,
  

} from 'class-validator'; // Library for applying validation rules to DTOs.

export class updateProductDto {

  @IsOptional () // This field is optional for requests.
  @IsString () // Ensures that the `name` field, if provided, is a string.

  // Adds metadata for Swagger documentation with a description and example.
  @ApiProperty ({

    description: 'name: Name is required. Name must be a string chain.',
    example: 'Laptop',

  }) 
  name?: string; // Product name.

  @IsOptional () // This field is optional for requests.
  @IsString () // Ensures that the `description` field, if provided, is a string.

  // Adds metadata for Swagger documentation with a description and example.
  @ApiProperty ({

    description: 'description: Description is required. Description must be a string chain.',
    example: 'A high performance laptop for professionals.',

  }) 
  description?: string; // Product description.

  @IsOptional () // This field is optional for requests.
  @IsNumber () // Ensures that the `price` field, if provided, is a number.
  @IsPositive () // Ensures the `price` is a positive number.


  // Adds metadata for Swagger documentation with a description and example.
  @ApiProperty ({

    description: 'price: Price is required. Price must be a positive number higher than 0.',
    example: 1500.99,

  }) 
  price?: number; // Product price.

  @IsOptional () // This field is optional for requests.
  @IsInt () // Ensures that the `stock` field, if provided, is an integer.
  @Min (0) // Ensures that the `stock` is 0 or greater.

  // Adds metadata for Swagger documentation with a description and example.
  @ApiProperty ({

    description: 'stock: Available quantity in inventory. Stock must be an integer number higher than 0.',
    example: 25,

  }) 
  stock?: number; // Quantity available in inventory.

  @IsOptional () // This field is optional for requests.
  @IsUrl () // Ensures that the `imgUrl` field, if provided, is a valid URL.

  // Adds metadata for Swagger documentation with a description and example.
  @ApiProperty ({

    description: 'imgUrl: URL image. URL must be a valid link.',
    example: 'https://example.com/product-image.jpg',

  }) 
  imgUrl?: string; // URL of the product's image.
  
}

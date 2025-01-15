

/**

 * This file defines the `CreateOrderDto` class and a `validateProducts` function for managing order creation:
 * - The `CreateOrderDto` class ensures proper validation for the `userId` and `products` fields using decorators.
 * - The `validateProducts` function dynamically checks that each product in the `products` array contains a valid UUID.

*/

import { ApiProperty } from '@nestjs/swagger'; // For API documentation of DTO properties.

import { 

  IsNotEmpty, // Ensures a field is not empty.
  IsUUID,     // Validates that a field is a UUID.
  IsArray,    // Validates that a field is an array.
  ArrayMinSize // Validates that an array has a minimum size.

} from 'class-validator'; // Provides validation decorators for classes.

export class CreateOrderDto {

  @IsNotEmpty ({ message: 'The userId field cannot be empty.' }) // Ensures the field is not empty.
  @IsUUID ('4', { message: 'The userId field must be a valid UUID.' }) // Validates the field as a UUID (version 4).

  @ApiProperty ({

    description: 'The userId of the user placing the order. Must not be empty and must be a valid UUID.',

  })
  userId: string; // The user ID associated with the order.

  @IsArray ({ message: 'The products field must be an array.' }) // Ensures the field is an array.
  @ArrayMinSize (1, { message: 'The products array must contain at least one item.' }) // Ensures the array contains at least one item.

  @ApiProperty ({

    description: 'The list of products in the order. Must be an array and contain at least one item.',

  })
  products: Record<string, any>[]; // Represents a dynamic structure for objects within the array.

}

export function validateProducts (products: Record<string, any>[]) {

  for (const product of products) {

    // Check if the product object has an `id` field and if it's a string.
    if (!product.id || typeof product.id !== 'string') {

      throw new Error ('Each product must have a valid id, and it must be a string.');

    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;  // Define a regular expression to validate UUIDs.

    // Check if the `id` matches the UUID format.
    if (!uuidRegex.test (product.id)) {

      throw new Error('Each id in products must be a valid UUID.');

    }

  }

}

  
  
  
  

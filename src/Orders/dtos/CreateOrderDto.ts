

/**
 * This file defines the `CreateOrderDto` class and a dynamic validation function for orders.
 * The `CreateOrderDto` class validates user input for creating orders, including the user ID and products array.
 * The `validateProducts` function provides additional validation for each product in the array.
 */

import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize } from 'class-validator'; // Importing validation decorators.

export class CreateOrderDto {

  @IsNotEmpty ({ message: 'The userId field cannot be empty.' }) // Ensures the field is not empty.
  @IsUUID ('4', { message: 'The userId field must be a valid UUID.' }) // Validates the field as a UUID (version 4).
  userId: string; // The ID of the user placing the order.

  @IsArray ({ message: 'The products field must be an array.' }) // Ensures the field is an array.
  @ArrayMinSize (1, { message: 'The products array must contain at least one item.' }) // Ensures the array has at least one item.
  products: Record<string, any>[]; // Represents a dynamic structure for objects within the array.
}

/**
 * Function to dynamically validate the structure of each product in the products array.
 * Ensures each product has a valid UUID for its `id` field.
 * 
 * @param products - Array of product objects to validate.
 * @throws Error if any product object is invalid.
 */
export function validateProducts (products: Record<string, any>[]) {

  for (const product of products) {

    // Ensure the product has an `id` field and it's a string
    if (!product.id || typeof product.id !== 'string') {

      throw new Error ('Each product must have a valid id, and it must be a string.');

    }

    // Check if the `id` matches a valid UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(product.id)) {

      throw new Error('Each id in products must be a valid UUID.');

    }

  }
  
}




  
  
  
  

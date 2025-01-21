

/**
 
 * This file defines the `CreateUserDto` class for data validation in user creation.
 * 
 * The class uses `class-validator` decorators to enforce validation rules for user input fields.
 * Each property is optional but includes constraints for when provided, ensuring robust and secure data handling.
 
*/

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'; // Decorator for documenting API models and properties.

import {

  IsOptional, // Marks a property as optional during validation.
  IsNotEmpty, // Ensures the property is not empty if provided.
  IsString, // Validates that the property is a string.
  IsEmail, // Validates the property is a valid email address.
  Length, // Sets constraints on the minimum and maximum length of the property.
  Matches, // Validates the property against a specified regex pattern.
  IsNumberString,  
  IsBoolean,
  IsEmpty, // Ensures the property contains only numeric characters.
 

} from 'class-validator'; // Importing validation decorators from the `class-validator` library.

export class CreateUserDtoAdmin {

  @IsOptional () // The `name` field is optional for certain requests, like updates.
  @IsNotEmpty ({ message: 'Name is required.' }) // If provided, it cannot be empty.
  @IsString ({ message: 'Name must be a string.' }) // Ensures the `name` field is a string.
  @Length (3, 80, { message: 'Name must be between 3 and 80 characters.' }) // Limits the `name` length to between 3 and 80 characters.

  @ApiProperty ({ 

    description: 'Name must be between 3 and 80 characters.',     
    example: 'Juan Pérez' 

  }) // Metadata for Swagger documentation.
  name?: string; // User's name.

  @IsOptional () // The `email` field is optional for certain requests.
  @IsNotEmpty ({ message: 'Email is required.' }) // If provided, it cannot be empty.
  @IsEmail ({}, { message: 'Must provide a valid email address.' }) // Validates the email format.

  @ApiProperty ({ 
    description: 'Email must be a valid email address.', 
    example: 'example@mail.com' 
  
  }) // Swagger metadata.
  email?: string; // User's email address.

  @IsOptional () // The `password` field is optional for certain requests.
  @IsNotEmpty ({ message: 'Password is required.' }) // If provided, it cannot be empty.
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'Password must meet complexity requirements.',
  }) // Validates the password's strength.

  @ApiProperty ({ 
    description: 'Password must be strong and secure.', 
    example: 'Password123!' 
  
  }) // Swagger metadata.
  password?: string; // User's password.

  @IsOptional () // The `confirmPassword` field is optional for certain requests.
  @IsNotEmpty ({ message: 'Password confirmation is required.' }) // If provided, it cannot be empty.
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'Password confirmation must meet complexity requirements.',
  }) // Validates the password confirmation's strength.

  @ApiProperty ({ 
    
    description: 'Confirm password with the same complexity as password.', 
    example: 'Password123!' 

  }) // Swagger metadata.
  confirmPassword?: string; // Confirmation for user's password.

  @IsOptional () // The `isAdmin` field is optional and typically managed internally.
  @IsBoolean () // Ensures the field is a boolean value.
  @IsEmpty () // Prevents external users from setting this field.
  @ApiHideProperty () // Hides the field from Swagger documentation.
  isAdmin?: boolean; // Flag indicating if the user has admin privileges.
  
  @IsOptional () // The `address` field is optional.
  @IsNotEmpty ({ message: 'Address is required.' }) // If provided, it cannot be empty.
  @IsString ({ message: 'Address must be a string.' }) // Ensures the address is a string.
  @Length (3, 80, { message: 'Address must be between 3 and 80 characters.' }) // Limits the length of the address.

  @ApiProperty ({ 
    
    description: 'Address must be a string between 3 and 80 characters.',
    example: '100 Test St' 
  
  }) // Swagger metadata.
  address?: string; // User's address.

  @IsOptional () // The `phone` field is optional.
  @IsNotEmpty ({ message: 'Phone number is required.' }) // If provided, it cannot be empty.
  @IsNumberString ({}, { message: 'Phone number must be numeric.' }) // Validates that the phone number contains only numbers.

  @ApiProperty ({ 
    
    description: 'Phone number must be numeric.', 
    example: '600000000' 
  
  }) // Swagger metadata.
  phone?: number; // User's phone number.

  @IsOptional () // The `country` field is optional.
  @IsNotEmpty ({ message: 'Country is required.' }) // If provided, it cannot be empty.
  @IsString ({ message: 'Country must be a string.' }) // Ensures the country is a string.
  @Length (5, 20, { message: 'Country must be between 5 and 20 characters.' }) // Limits the length of the country field.

  @ApiProperty ({ 
    
    description: 'Country must be between 5 and 20 characters.', 
    example: 'United States' 
  
  }) // Swagger metadata.
  country?: string; // User's country.

  @IsOptional () // The `city` field is optional.
  @IsNotEmpty ({ message: 'City is required.' }) // If provided, it cannot be empty.
  @IsString ({ message: 'City must be a string.' }) // Ensures the city is a string.
  @Length (5, 20, { message: 'City must be between 5 and 20 characters.' }) // Limits the length of the city field.

  @ApiProperty ({ 
    
    description: 'City must be between 5 and 20 characters.', 
    example: 'Florida' 
  
  }) // Swagger metadata.
  city?: string; // User's city.

}

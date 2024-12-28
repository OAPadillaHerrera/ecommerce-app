

/**
 * This file defines the `CreateUserDto` class for data validation in user creation.
 * The class uses `class-validator` decorators to enforce validation rules for user input fields.
 * Each property is optional but includes constraints for when provided.
 */

import { ApiProperty } from '@nestjs/swagger';
import {

  IsOptional, // Marks a property as optional.
  IsNotEmpty, // Ensures the property is not empty.
  IsString, // Validates the property is a string.
  IsEmail, // Validates the property is a valid email address.
  Length, // Sets minimum and maximum length constraints.
  Matches, // Validates the property against a regex pattern.
  IsNumberString,
  isEmpty, // Ensures the property is a string of numbers.

} from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {

  @IsOptional () // Field is optional for requests like PUT.
  @IsNotEmpty ({ message: 'Name is required.' }) // Ensures the field is not empty if provided.
  @IsString ({ message: 'Name must be a string.' }) // Validates that the field is a string.
  @Length (3, 80, { message: 'Name must be between 3 and 80 characters.' }) // Enforces length constraints.
  @ApiProperty ( { description: 'name: Name is required. Name must be a string. Name must be between 3 and 80 characters.', example: 'Juan Pérez' })
  name?: string; // User's name.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Email is required.' })
  @IsEmail ({}, { message: 'Must provide a valid email address.' }) // Validates email format.
  @ApiProperty ( { description: 'e-mail: Email is required. Must provide a valid email address.', example: 'example@mail.com' })
  email?: string; // User's email address.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Password is required.' })
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).',
  }) // Enforces a strong password format.
  @ApiProperty ( { description: 'password: Password is required. Password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).', example: 'Password123!' })
  password?: string; // User's password.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Password is required.' })
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).',
  }) // Enforces a strong password format.
  @ApiProperty ( { description: 'password: ConfirmPassword is required. Password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).', example: 'Password123!' })
  confirmPassword?: string; // User's password.

  @IsOptional()
  @Column ({ default: false })
  @ApiProperty ()
  isAdmin: string;

  @IsOptional ()
  @IsNotEmpty ({ message: 'Address is required.' })
  @IsString ({ message: 'Address must be a string.' })
  @Length (3, 80, { message: 'Address must be between 3 and 80 characters.' })
  @ApiProperty ( { description: 'address: Address is required. Address must be a string. Address must be between 3 and 80 characters.', example: '100 Test St' })
  address?: string; // User's address.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Phone number is required.' })
  @IsNumberString ({}, { message: 'Phone number must be numeric.' }) // Ensures the phone number contains only digits.
  @ApiProperty ( { description: 'phone: Phone number is required. Phone number must be numeric.', example: '600000000' })
  phone?: number; // User's phone number.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Country is required.' })
  @IsString ({ message: 'Country must be a string.' })
  @Length (5, 20, { message: 'Country must be between 5 and 20 characters.' })
  @ApiProperty ( { description: 'country: Country is required.. Country must be a string. Country must be between 5 and 20 characters.', example: 'United States' })
  country?: string; // User's country.

  @IsOptional ()
  @IsNotEmpty ({ message: 'City is required.' })
  @IsString ({ message: 'City must be a string.' })
  @Length (5, 20, { message: 'City must be between 5 and 20 characters.' })
  @ApiProperty ( { description: 'city: City is required. City must be a string. City must be between 5 and 20 characters.', example: 'Florida' })
  city?: string; // User's city.

  @ApiProperty ()
  roles?: string[]; // Opcional si no siempre está presente
  
}

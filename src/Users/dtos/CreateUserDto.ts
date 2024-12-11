

/**
 * This file defines the `CreateUserDto` class for data validation in user creation.
 * The class uses `class-validator` decorators to enforce validation rules for user input fields.
 * Each property is optional but includes constraints for when provided.
 */

import {

  IsOptional, // Marks a property as optional.
  IsNotEmpty, // Ensures the property is not empty.
  IsString, // Validates the property is a string.
  IsEmail, // Validates the property is a valid email address.
  Length, // Sets minimum and maximum length constraints.
  Matches, // Validates the property against a regex pattern.
  IsNumberString, // Ensures the property is a string of numbers.

} from 'class-validator';

export class CreateUserDto {

  @IsOptional () // Field is optional for requests like PUT.
  @IsNotEmpty ({ message: 'Name is required.' }) // Ensures the field is not empty if provided.
  @IsString ({ message: 'Name must be a string.' }) // Validates that the field is a string.
  @Length (3, 80, { message: 'Name must be between 3 and 80 characters.' }) // Enforces length constraints.
  name?: string; // User's name.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Email is required.' })
  @IsEmail ({}, { message: 'Must provide a valid email address.' }) // Validates email format.
  email?: string; // User's email address.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Password is required.' })
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).',
  }) // Enforces a strong password format.
  password?: string; // User's password.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Password is required.' })
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).',
  }) // Enforces a strong password format.
  confirmPassword?: string; // User's password.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Address is required.' })
  @IsString ({ message: 'Address must be a string.' })
  @Length (3, 80, { message: 'Address must be between 3 and 80 characters.' })
  address?: string; // User's address.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Phone number is required.' })
  @IsNumberString ({}, { message: 'Phone number must be numeric.' }) // Ensures the phone number contains only digits.
  phone?: number; // User's phone number.

  @IsOptional ()
  @IsNotEmpty ({ message: 'Country is required.' })
  @IsString ({ message: 'Country must be a string.' })
  @Length (5, 20, { message: 'Country must be between 5 and 20 characters.' })
  country?: string; // User's country.

  @IsOptional ()
  @IsNotEmpty ({ message: 'City is required.' })
  @IsString ({ message: 'City must be a string.' })
  @Length (5, 20, { message: 'City must be between 5 and 20 characters.' })
  city?: string; // User's city.
}

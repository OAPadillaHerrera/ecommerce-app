

/*import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'El campo email no puede estar vacío.' })
  @IsEmail({}, { message: 'El campo email debe ser una dirección de correo válida.' })
  email: string;

  @IsNotEmpty({ message: 'El campo password no puede estar vacío.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;
}*/

/**
 * This file defines the `LoginUserDto` class for validating user login credentials.
 * The class ensures that the `email` and `password` fields are provided and meet specific format requirements.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator'; // Importing validation decorators.

export class LoginUserDto {

  @IsNotEmpty ({ message: 'The email field cannot be empty.' }) // Ensures the field is not empty.
  @IsEmail ({}, { message: 'The email field must be a valid email address.' }) // Validates that the field contains a properly formatted email.
  @ApiProperty ( { description: 'email: Email is required. The email field cannot be empty. The email field must be a valid email address.', example: 'example@mail.com' })
  email: string; // Represents the user's email address for login.

  @IsNotEmpty ({ message: 'The password field cannot be empty.' }) // Ensures the field is not empty.
  @Matches (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'The password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).',
  }) // Enforces strong password requirements.
  @ApiProperty ( { description: 'password: Password is required. The password field cannot be empty. The password must be 8-15 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).', example: 'Password123!' })
  password: string; // Represents the user's password for login.
  
}


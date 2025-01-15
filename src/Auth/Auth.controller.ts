

/**
 
 * This file defines the `AuthController` class, which handles authentication-related routes.
 * The `AuthController` provides endpoints for user registration (signup) and login (signin).
 * It interacts with the `AuthService` to manage authentication operations and generate JWT tokens.

 */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service'; // Service for authentication logic.
import { LoginUserDto } from './dtos/LoginUserDto'; // DTO for user login.
import { CreateUserDto } from 'src/Users/dtos/CreateUserDto'; // DTO for user registration.

@Controller ('auth') // Controller for authentication routes.

export class AuthController {

  constructor (private readonly authService: AuthService) {} // Injects AuthService.

  @Post ('/signup') // Endpoint: POST /auth/signup.

  async signUp (@Body () createUserDto: CreateUserDto) {

    const { password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) { // Validates password confirmation.

      throw new Error ('Passwords are not the same.');

    }

    const user = await this.authService.signUp (createUserDto); // Registers the user.

    return {

      message: 'User registered successfully.',
      user,

    };
  }

  @Post('/signin') // Endpoint: POST /auth/signin.

  async logUser (@Body () loginUserDto: LoginUserDto) {

    const token = await this.authService.logUser (loginUserDto); // Authenticates user and generates a token.

    return {

      message: 'Successful sesion start.', // Standard response for login.
      token,

    };

  }
  
}


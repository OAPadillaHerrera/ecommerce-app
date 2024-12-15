

/**
 * This file defines the `AuthController` class, which handles authentication-related 
 * routes in the application.
 * 
 * The `AuthController` provides endpoints for user registration (signup) and 
 * login (signin). It interacts with the `AuthService` to handle the core business logic.
 */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUserDto'; // Data Transfer Object for login.
import { CreateUserDto } from 'src/Users/dtos/CreateUserDto'; // DTO for user registration.

@Controller ('auth')

export class AuthController {

    /**
     * Initializes the `AuthController` with an instance of the `AuthService`.
     * 
     * @param authService - The service responsible for authentication operations.
     */

    constructor (private readonly authService: AuthService) {}

    /**
     * Handles `GET /auth` requests.
     * 
     * @returns A message or object provided by the `AuthService` for basic auth route handling.
     */

    @Get ()

    getAuth () {

      return this.authService.getAuth ();

    }

    /**
     * Handles `POST /auth/signup` requests for user registration.
     * 
     * Validates that the passwords match and delegates user creation to the `AuthService`.
     * 
     * @param createUserDto - The data transfer object containing user registration details.
     * @returns A confirmation message and the registered user object.
     */

    @Post ('/signup')

    async signUp (@Body () createUserDto: CreateUserDto) {

      const { password, confirmPassword } = createUserDto;

      // Ensure that both passwords match.
      if (password !== confirmPassword) {

        throw new Error ('Passwords are not the same.');

      }

      // Call the service to register the user.
      const user = await this.authService.signUp (createUserDto);

        return {

          message: 'User registered successfully.',
          user,

        };

    }

    /**
     * Handles `POST /auth/signin` requests for user authentication.
     * 
     * Delegates the login process to the `AuthService` and returns a JWT token.
     * 
     * @param loginUserDto - The data transfer object containing login credentials.
     * @returns A confirmation message and the generated authentication token.
     */

    @Post ('/signin')

    async logUser(@Body () loginUserDto: LoginUserDto) {

      // Call the service to authenticate the user and generate a token.
      const token = await this.authService.logUser (loginUserDto);

        // Return a standard response with the token.
        return {

            message: 'Inicio de sesión exitoso',
            token,

        };

    }
    
}


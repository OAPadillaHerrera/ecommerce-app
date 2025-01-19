

/* 

This file defines the `AuthService` class, which handles authentication logic in a NestJS application. 
It interacts with `UsersRepository` for user data, `UsersService` for user operations, and `JwtService` for generating JWT tokens. 
Additional functionality includes user login and signup with role validation and secure password handling.

*/

import { Injectable, UnauthorizedException } from '@nestjs/common'; // Import necessary exceptions and decorators from NestJS.
import { UsersRepository } from '../Users/users.repository'; // Import UsersRepository for user data management.
import { LoginUserDto } from './dtos/LoginUserDto'; // Import DTO for login validation.
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing and comparison.
import { CreateUserDto } from '../Users/dtos/CreateUserDto'; // Import DTO for user creation validation.
import { UsersService } from '../Users/Users.service'; // Import UsersService for user operations.
import { JwtService } from '@nestjs/jwt'; // Import JwtService for generating and managing JWT tokens.

@Injectable () // Mark this class as a service in the NestJS dependency injection system.

export class AuthService {

  constructor (

    private readonly usersRepository: UsersRepository, // Inject UsersRepository.
    private readonly usersService: UsersService, // Inject UsersService.
    private readonly jwtService: JwtService, // Inject JwtService.

  ) {}

  async logUser (loginUserDto: LoginUserDto): Promise<{ token: string, expiresAt: string }> { // Method to log in a user.

    const { email, password } = loginUserDto; // Destructure email and password from DTO.

    const user = await this.usersRepository.logUser (email); // Fetch user by email from repository.

    if (!user) { // If user is not found.

      throw new UnauthorizedException ('Invalid Email or Password'); // Throw an unauthorized exception.

    }

    const isPasswordValid = await bcrypt.compare (password, user.password); // Compare provided password with stored hashed password.

    if (!isPasswordValid) { // If password is invalid.

      throw new UnauthorizedException( 'Invalid Email or Password'); // Throw an unauthorized exception.

    }

    /*let roles = Array.isArray (user.roles) ? user.roles : []; // Ensure roles is an array.

    if (typeof user.roles === 'string') { // If roles is a string.

      try {

        roles = JSON.parse (user.roles); // Parse roles as JSON.

        if (!Array.isArray (roles)) { // Validate roles is an array.

          throw new UnauthorizedException ('Error in the roles format'); // Throw an error if roles is not an array.

        }

      } catch (error) {

        throw new UnauthorizedException ('Error at proccessing the roles format'); // Handle JSON parsing errors.

      }
    }

    if (roles.length === 1 && typeof roles [0] === 'string') { // Handle specific roles format.

      try {

        roles = JSON.parse (roles [0]); // Parse inner JSON string.

      } catch (error) {

        throw new UnauthorizedException ('Error at processing the roles format'); // Handle parsing errors.

      }

    }*/

    let isAdmin: boolean; // Ensure isAdmin is a boolean.

    if (typeof user.isAdmin === 'string') { // If isAdmin is a string.

      isAdmin = user.isAdmin === 't'; // Convert 't' to true, 'f' to false.

    } else {

      isAdmin = user.isAdmin === true; // Otherwise, use as boolean.

    }

    const payload = { // Create JWT payload.
      sub: user.id, // Include user ID as 'sub'.
      email: user.email, // Include user email.
      /*roles: roles, // Include roles array.*/
      isAdmin: isAdmin, // Include isAdmin flag.

    };

    if (!process.env.JWT_SECRET) { // Ensure JWT_SECRET is configured.

      throw new UnauthorizedException ('JWT_SECRET is not configured'); // Throw an error if missing.

    }

    try {

      const token = this.jwtService.sign (payload, { // Generate JWT token.

        secret: process.env.JWT_SECRET, // Use JWT_SECRET environment variable.
        expiresIn: '1h', // Set token expiration to 1 hour.

      });

      const expiresAt = new Date (Date.now () + 60 * 60 * 1000).toISOString(); // Calculate token expiration date.
      return { token, expiresAt }; // Return token and expiration date.

    } catch (error) {

      throw new UnauthorizedException ('Error at generating the token'); // Throw an error if token generation fails.

    }
  }

  async signUp (user: CreateUserDto): Promise<{ id: string, password: string }> { // Method to sign up a new user.

    const createdUser = await this.usersService.createUser (user); // Delegate user creation to UsersService.
    return createdUser; // Return the created user.

  }
  
}


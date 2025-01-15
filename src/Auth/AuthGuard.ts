

/**
 
 * This file defines the `AuthGuard` class, a custom authentication guard 
 * for validating JSON Web Tokens (JWT) in a NestJS application.
 * 
 * Key functionalities:
 
 * - Checks the presence and validity of a JWT in the `Authorization` header.
 * - Verifies the token using the `JwtService` and attaches the decoded payload to the request object.
 * - Handles common JWT-related errors, including expiration and invalid tokens.

*/

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'; // Core NestJS decorators and classes for guards and exceptions.
import { JwtService } from '@nestjs/jwt'; // Service for working with JSON Web Tokens (JWT) in NestJS.
import { Request } from 'express'; // Type definition for the HTTP request object.

@Injectable () // Marks the class as injectable for dependency injection in NestJS.

export class AuthGuard implements CanActivate { // Defines a custom guard implementing the `CanActivate` interface.

  constructor (private readonly jwtService: JwtService) {} // Injects the `JwtService` for JWT operations.

   canActivate (context: ExecutionContext): boolean {

    const request = context.switchToHttp ().getRequest<Request>(); // Extract the HTTP request object from the execution context.

    if (!request) {

      throw new UnauthorizedException ('Request object is undefined'); // Throws an error if the request object is missing.

    }

    const authHeader = request.headers ['authorization']; // Retrieve the `Authorization` header.

    if (!authHeader) {

      throw new UnauthorizedException ('Authorization header is missing'); // Throws an error if the header is absent.

    }

    const [scheme, token] = authHeader.split (' '); // Split the header into the scheme and token.

    if (scheme !== 'Bearer') {

      throw new UnauthorizedException ('Authorization header does not use the "Bearer" scheme'); // Ensures the scheme is "Bearer".

    }

    try {

      // Verify the token using the `JwtService`.
      const payload = this.jwtService.verify (token, {

        secret: process.env.JWT_SECRET, // Secret key from environment variables.

      });
      
      // Ensure the payload contains roles.
      if (!payload.roles || !Array.isArray (payload.roles)) {

        throw new UnauthorizedException ('Token does not contain valid roles'); // Validates roles in the payload.

      }

      request ['user'] = payload; // Attach the decoded payload to the request object.
      
      return true; // Grant access if the token is valid.

    } catch (error) {

      // Handle JWT-specific errors.
      if (error.name === 'TokenExpiredError') {

        throw new UnauthorizedException ('Token has expired'); // Handles expired tokens.

      } else if (error.name === 'JsonWebTokenError') {

        throw new UnauthorizedException ('Token is invalid'); // Handles invalid tokens.

      } else {

        console.error ('JWT verification error:', error); // Logs unexpected errors.
        throw new UnauthorizedException ('An error occurred while verifying the token'); // Handles other errors during verification.

      }

      
    }

  }
  
}

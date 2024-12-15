

/**
 * This file defines the `AuthGuard` class, a custom authentication guard 
 * for validating JSON Web Tokens (JWT) in a NestJS application.
 * 
 * The `AuthGuard` checks the presence and validity of a JWT in the 
 * `Authorization` header of incoming HTTP requests, and attaches the 
 * decoded payload to the request object for further use.
 */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable ()

export class AuthGuard implements CanActivate {

    /**
     * Initializes the `AuthGuard` with a `JwtService` instance for token verification.
     * 
     * @param jwtService - The service used to decode and verify JWTs.
     */

    constructor (private readonly jwtService: JwtService) {}

    /**
     * Validates the request by checking for a valid JWT in the `Authorization` header.
     * 
     * @param context - The execution context of the current request.
     * @returns `true` if the request contains a valid JWT, otherwise throws an exception.
     */

    canActivate (context: ExecutionContext): boolean {
        
        const request = context.switchToHttp ().getRequest<Request> (); // Extract the HTTP request object from the execution context.

        if (!request) {

          throw new UnauthorizedException ('Request object is undefined');

        }
       
        const authHeader = request.headers ['authorization'];  // Retrieve the `Authorization` header.

        if (!authHeader) {

          throw new UnauthorizedException ('Authorization header is missing');

        }

        const [scheme, token] = authHeader.split (' '); // Split the header into the scheme and token.

        if (scheme !== 'Bearer') {

            throw new UnauthorizedException('Authorization header does not use the "Bearer" scheme');

        }

        try {

            // Verify the token using the `JwtService`.
            const payload = this.jwtService.verify (token, {

                secret: process.env.JWT_SECRET, // Secret key from environment variables.

            });

            console.log ('Payload:', payload); // Debugging: Log the decoded payload.

            // Ensure the payload contains roles.

            if (!payload.roles || !Array.isArray (payload.roles)) {

              throw new UnauthorizedException ('Token does not contain valid roles');

            }

            request ['user'] = payload; // Attach the decoded payload to the request object.

            console.log ('Request user:', request['user']); // Debugging: Log the attached user object.

            return true; // Grant access if the token is valid.

        } catch (error) {

            // Handle JWT-specific errors.
            if (error.name === 'TokenExpiredError') {

              throw new UnauthorizedException ('Token has expired');

            } else if (error.name === 'JsonWebTokenError') {

                throw new UnauthorizedException ('Token is invalid');

            } else {

                console.error('JWT verification error:', error);
                throw new UnauthorizedException('An error occurred while verifying the token');
                
            }

        }

    }

}

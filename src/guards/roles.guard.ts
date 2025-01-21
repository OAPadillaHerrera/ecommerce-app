

/**
 
 * This file defines the `RolesGuard` class, a custom guard for handling role-based 
 * authorization in a NestJS application.
 * 
 * The `RolesGuard` ensures that only users with the required roles can access 
 * specific routes or controllers, based on metadata.
 * 
 * It uses the `Reflector` service to retrieve metadata and validates the user's 
 * roles accordingly.
 
*/

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"; // CanActivate: Interface for guards, ExecutionContext: Provides context for the current request, ForbiddenException: Used to throw 403 errors, Injectable: Marks the class as injectable for dependency injection.
import { Reflector } from "@nestjs/core"; // Reflector: Utility to access metadata defined with decorators, useful in custom guards and interceptors.
import { Role } from "src/roles.enum"; // Enum defining available user roles in the application.

@Injectable ()

export class RolesGuard implements CanActivate {

    /**
     
     * Initializes the `RolesGuard` with a `Reflector` instance to access metadata.
     * 
     * @param reflector - An instance of the `Reflector` service for retrieving role metadata.
     
    */

    constructor (private readonly reflector: Reflector) {}

    /**
     
     * Determines whether a user has permission to access a route based on their roles.
     * 
     * @param context - The execution context for the current request.
     * @returns `true` if the user has the required roles, otherwise throws an exception.
    
    */    

    canActivate (context: ExecutionContext): boolean {

        // Retrieve the required roles from metadata on the route or controller.
        const requiredRoles = this.reflector.getAllAndOverride<Role []>('roles', [

            context.getHandler (), // Method-level metadata.
            context.getClass (),   // Controller-level metadata.

        ]);

        if (!requiredRoles) {

            return true; // Allow access if no roles are specified.

        }

        // Extract the user information from the HTTP request.
        const request = context.switchToHttp ().getRequest ();
        const user = request.user;

        // Check if the user has the required role (in this case, administrator) using isAdmin.
        const hasRole = () => {

            if (requiredRoles.includes (Role.Admin)) { // Role.Admin is the role for administrators.

             return user?.isAdmin === true; // Check isAdmin.

         }

            return false; // Deny access if the role is not admin.
        };

        const valid = user && hasRole ();

        if (!valid) {

            // Throw an exception if the user lacks the required role.
            throw new ForbiddenException (

                'Denied access: Do not have needed role to access this route.'

            );
        }

        return valid; // Grant access if the user's role is valid.

    }

}

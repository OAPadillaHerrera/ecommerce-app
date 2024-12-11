

/**
 * This file provides validation logic for HTTP requests targeting
 * User and Product entities. It includes specific rules for each
 * entity and a guard to enforce these validations.
 */

import { CanActivate, ExecutionContext, Injectable, BadRequestException } from "@nestjs/common"; // Import required NestJS components.

function validateRequest (request: Request): boolean {

    const { method, body, url } = request as any; // Extract method, body, and URL from the request.

    const isUser = url.includes ("users"); // Check if the URL targets User.
    const isProduct = url.includes ("products"); // Check if the URL targets Product.

    if (!body || typeof body !== "object") { // Check if the body is a valid object.

        console.error ("Validation error: Body must be a valid object."); // Log error for invalid body structure.
        return false;

    }

    if (isUser) {

        return validateUserRequest (method, body); // Validate User requests.

    } else if (isProduct) {

        return validateProductRequest (method, body); // Validate Product requests.

    } else {

        console.error ("Validation error: Unrecognized entity."); // Log error for unknown entity.
        return false;

    }

}

function validateUserRequest (method: string, body: any): boolean {

    const requiredFieldsForPost = ["email", "name", "password", "address", "phone", "country", "city"]; // Fields required for POST requests.
    const allFields = [...requiredFieldsForPost, "id"]; // All possible fields for User.

    if (method === "POST") {

        for (const field of requiredFieldsForPost) { // Check required fields for POST requests.

            if (!body.hasOwnProperty (field)) { // Validate the presence of required fields.

                console.error (`Validation error: ${field} is required for User.`);
                return false;

            }

            if (!validateFieldType (field, body [field], "User")) { // Validate field types.

                console.error (`Validation error: ${field} has an invalid type for User.`);
                return false;

            }

        } 

    } else if (method === "PUT") {

        for (const field in body) { // Check fields provided in PUT requests.

            if (!allFields.includes (field)) { // Validate that fields are allowed.

                console.error (`Validation error: ${field} is not a valid field for User.`);
                return false;

            }

            if (!validateFieldType (field, body[field], "User")) { // Validate field types.

                console.error (`Validation error: ${field} has an invalid type for User.`);
                return false;

            }

        }

    }

    return true;

}

function validateProductRequest (method: string, body: any): boolean {

    const requiredFieldsForPost = ["name", "description", "price", "stock", "imgUrl"]; // Fields required for POST requests.
    const allFields = [...requiredFieldsForPost, "id"]; // All possible fields for Product.

    if (method === "POST") {

        for (const field of requiredFieldsForPost) { // Check required fields for POST requests.

            if (!body.hasOwnProperty (field)) { // Validate the presence of required fields.

                console.error (`Validation error: ${field} is required for Product.`);
                return false;

            }

            if (!validateFieldType (field, body[field], "Product")) { // Validate field types.
                console.error (`Validation error: ${field} has an invalid type for Product.`);
                return false;

            }

        }

    } else if (method === "PUT") {

        for (const field in body) { // Check fields provided in PUT requests.

            if (!allFields.includes (field)) { // Validate that fields are allowed.

                console.error (`Validation error: ${field} is not a valid field for Product.`);
                return false;
            }

            if (!validateFieldType (field, body[field], "Product")) { // Validate field types.

                console.error(`Validation error: ${field} has an invalid type for Product.`);
                return false;

            }

        }

    }

    return true;

}

function validateFieldType(field: string, value: any, entity: "User" | "Product"): boolean {

    const fieldTypes: Record<"User" | "Product", Record<string, string>> = {

        User: { // Field types for User.

            id: "number",
            email: "string",
            name: "string",
            password: "string",
            address: "string",
            phone: "string",
            country: "string",
            city: "string",

        },

        Product: { // Field types for Product.

            id: "number",
            name: "string",
            description: "string",
            price: "number",
            stock: "number",
            imgUrl: "string",
            categories: "any",

        },

    };

    return typeof value === fieldTypes [entity][field]; // Validate field type.

}

@Injectable ()

export class ValidateGuard implements CanActivate {

    canActivate (context: ExecutionContext): boolean {

        const request = context.switchToHttp ().getRequest (); // Extract the HTTP request.
        const isValid = validateRequest (request); // Validate the request.

        if (!isValid) {

            throw new BadRequestException ("Invalid request body structure."); // Throw an exception for invalid requests.

        }

        return true; // Allow execution for valid requests.

    }

}

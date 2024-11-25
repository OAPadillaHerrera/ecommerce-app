

import { CanActivate, ExecutionContext, Injectable, BadRequestException } from "@nestjs/common";

/* Validar solicitudes para las entidades User y Product.*/
function validateRequest(request: Request): boolean {

    const {method, body, url} = request as any;

    /* Determinar el tipo de entidad según la ruta.*/
    const isUser = url.includes ("users");
    const isProduct = url.includes ("products");

    if (!body || typeof body !== "object") {

        console.error ("Validation error: Body must be a valid object.");
        return false;
    }

    if (isUser) {

        return validateUserRequest (method, body);

    } else if (isProduct) {

        return validateProductRequest(method, body);

    } else {

        console.error("Validation error: Unrecognized entity.");
        return false;

    }
}

/* Validación específica para la entidad User.*/
function validateUserRequest(method: string, body: any): boolean {

    const requiredFieldsForPost = ["email", "name", "password", "address", "phone", "country", "city"];
    const allFields = [...requiredFieldsForPost, "id"]; // Todos los campos posibles.

    if (method === "POST") {

        for (const field of requiredFieldsForPost) {

            if (!body.hasOwnProperty (field)) {

                console.error(`Validation error: ${field} is required for User.`);
                return false;

            }

            if (!validateFieldType(field, body[field], "User")) {

                console.error (`Validation error: ${field} has an invalid type for User.`);
                return false;
            }
        }
    } else if (method === "PUT") {

        for (const field in body) {

            if (!allFields.includes (field)) {

                console.error (`Validation error: ${field} is not a valid field for User.`);
                return false;

            }

            if (!validateFieldType (field, body[field], "User")) {

                console.error (`Validation error: ${field} has an invalid type for User.`);
                return false;

            }

        }

    }

    return true;
}

/* Validación específica para la entidad Product.*/
function validateProductRequest (method: string, body: any): boolean {

    const requiredFieldsForPost = ["name", "description", "price", "stock", "imgUrl"];
    const allFields = [...requiredFieldsForPost, "id"]; // Todos los campos posibles.

    if (method === "POST") {

        for (const field of requiredFieldsForPost) {

            if (!body.hasOwnProperty(field)) {

                console.error (`Validation error: ${field} is required for Product.`);
                return false;

            }

            if (!validateFieldType (field, body[field], "Product")) {

                console.error (`Validation error: ${field} has an invalid type for Product.`);
                return false;

            }

        }

    } else if (method === "PUT") {

        for (const field in body) {

            if (!allFields.includes(field)) {

                console.error(`Validation error: ${field} is not a valid field for Product.`);
                return false;

            }

            if (!validateFieldType(field, body[field], "Product")) {
                console.error(`Validation error: ${field} has an invalid type for Product.`);
                return false;
            }

        }

    }

    return true;
}

/* Validar tipos según la entidad (User o Product).*/
function validateFieldType (field: string, value: any, entity: "User" | "Product"): boolean {

    const fieldTypes: Record <"User" | "Product", Record <string, string>> = {

        User: {

            id: "number",
            email: "string",
            name: "string",
            password: "string",
            address: "string",
            phone: "string",
            country: "string",
            city: "string",

        },

        Product: {

            id: "number",
            name: "string",
            description: "string",
            price: "number",
            stock: "boolean",
            imgUrl: "string",

        },

    };

    return typeof value === fieldTypes [entity][field];
}

// Guardián que aplica la validación
@Injectable()

export class ValidateGuard implements CanActivate {

    canActivate (context: ExecutionContext): boolean {

        const request = context.switchToHttp ().getRequest ();
        const isValid = validateRequest (request);

        if (!isValid) {

            throw new BadRequestException ("Invalid request body structure.");

        }

        return true;

    }
    
}

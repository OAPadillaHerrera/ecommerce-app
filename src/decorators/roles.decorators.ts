

/**
 * 
 * This file defines the `Roles` decorator, which is used to specify 
 * the roles required to access certain routes or methods in the application.
 * 
 * It utilizes the `SetMetadata` function from NestJS to attach metadata 
 * to routes, which can later be validated using guards.
 * 
 */

import { SetMetadata } from "@nestjs/common";
import { Role } from "src/roles.enum";

/**
 
 * The `Roles` decorator sets metadata for roles required to access a route or method.
 * 
 * @param roles - A list of roles that are allowed to access the target route or method.
 * @returns A metadata key-value pair with the key "roles" and the provided roles.
 
 */

export const Roles = (...roles: Role[]) => SetMetadata ("roles", roles);

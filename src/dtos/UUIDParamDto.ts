

/**
 * This file defines the `UUIDParamDto` class for validating route parameters.
 * The class ensures that an `id` parameter is provided and is a valid UUID (version 4).
 */

import { IsUUID } from 'class-validator'; // Importing the UUID validation decorator

export class UUIDParamDto {
  @IsUUID('4', { message: 'The ID must be a valid UUID (version 4).' }) // Validates the field as a version 4 UUID
  id: string; // Represents the ID parameter in the request
}


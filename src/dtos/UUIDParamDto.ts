

/**
 * This file defines the `UUIDParamDto` class for validating route parameters.
 * The class ensures that an `id` parameter is provided and is a valid UUID (version 4).
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator'; // Importing the UUID validation decorator

export class UUIDParamDto {
  @IsUUID('4', { message: 'The ID must be a valid UUID (version 4).' }) // Validates the field as a version 4 UUID
  @ApiProperty({ description: 'The unique identifier for the product', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', })
  id: string; // Represents the ID parameter in the request
}


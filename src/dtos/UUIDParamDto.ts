

/**
 
 * This file defines the `UUIDParamDto` class for validating route parameters.
 * - Ensures that the `id` parameter is provided and formatted as a valid UUID (version 4).
 * - Uses decorators for validation and API documentation.
 
*/

import { ApiProperty } from '@nestjs/swagger'; // Adds metadata for API documentation.
import { IsUUID } from 'class-validator'; // Validates that a field is a valid UUID (version 4).

export class UUIDParamDto {

  @IsUUID ('4', { message: 'The ID must be a valid UUID (version 4).' }) // Validates the field as a version 4 UUID.

  @ApiProperty ({

    description: 'The unique identifier for the user & others.',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',

  })
  id: string; // Represents the ID parameter in the request.
  
}


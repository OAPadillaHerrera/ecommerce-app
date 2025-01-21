

import { ApiProperty } from '@nestjs/swagger'; // Importing the ApiProperty decorator to define metadata for Swagger documentation.
import { IsString, IsNotEmpty } from 'class-validator'; // Importing validators to enforce validation rules on the DTO fields.

export class CreateCategoryDto { // Defining a Data Transfer Object (DTO) for creating a category.

  @ApiProperty ({ 

    description: 'Category name', // Description of the 'name' field for Swagger documentation.
    example: 'Electronics', // Example value to show in the Swagger documentation.

  })

  @IsString  () // Ensures that the 'name' field must be a string.
  @IsNotEmpty () // Ensures that the 'name' field cannot be empty.
  name: string; // Declaring the 'name' field as a string type.
  
}

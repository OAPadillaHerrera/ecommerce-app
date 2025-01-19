

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {

  @ApiProperty ({

    description: 'Nombre de la categoría',
    example: 'Electrónica', // Ejemplo para Swagger

  })

  @IsString ()
  @IsNotEmpty ()
  name: string;
  
}



import { IsUUID } from 'class-validator';

export class UUIDParamDto {
  @IsUUID('4', { message: 'El ID debe ser un UUID válido (versión 4).' })
  id: string;
}

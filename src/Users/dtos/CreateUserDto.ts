

import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional() // Opcional en PUT
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'Debe proporcionar un email válido.' })
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @IsString({ message: 'La dirección debe ser una cadena.' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres.' })
  address?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  @IsNumberString({}, { message: 'El número de teléfono debe ser numérico.' })
  phone?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @IsString({ message: 'El país debe ser una cadena.' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' })
  country?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @IsString({ message: 'La ciudad debe ser una cadena.' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' })
  city?: string;
}

  
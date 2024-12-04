

import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'El campo email no puede estar vacío.' })
  @IsEmail({}, { message: 'El campo email debe ser una dirección de correo válida.' })
  email: string;

  @IsNotEmpty({ message: 'El campo password no puede estar vacío.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;
}


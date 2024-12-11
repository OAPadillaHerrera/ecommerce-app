

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUserDto'; // Importa el DTO
import { CreateUserDto } from 'src/Users/dtos/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto;

    // Validar que ambas contraseñas coincidan
    if (password !== confirmPassword) {
      throw new Error('Passwords are not the same.');
    }

    // Llamar al servicio para registrar al usuario
    const user = await this.authService.signUp(createUserDto);

    return {
      message: 'User registered successfully.',
      user,
    };
  }
  
  @Post('/signin')
  async logUser(@Body() loginUserDto: LoginUserDto) {
    // Llamar al servicio para autenticar al usuario
    const token = await this.authService.logUser(loginUserDto);

    // Retornar respuesta en formato estándar
    return {
      message: 'Inicio de sesión exitoso',
      token,
    };
  }

}




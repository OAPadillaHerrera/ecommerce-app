

import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUserDto'; // Importa el DTO

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('/signin')
    async logUser(@Body() loginUserDto: LoginUserDto) {
        // Llamar al servicio para autenticar al usuario
        const user = await this.authService.logUser(loginUserDto);

        // Retornar respuesta en formato estándar
        return {
            message: 'Inicio de sesión exitoso',
            user,
        };
    }
}



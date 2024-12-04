

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';
import { LoginUserDto } from './dtos/LoginUserDto'; // Importa el DTO

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  getAuth() {
    return 'Auth';
  }

  async logUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

    // Buscar usuario por email
    const user = await this.usersRepository.logUser(email);

    // Si no se encuentra el usuario, lanzar excepción
    if (!user) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    // Comparar la contraseña directamente
    if (user.password !== password) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    // Excluir la contraseña antes de devolver el usuario
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
}
}

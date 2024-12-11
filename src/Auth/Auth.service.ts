

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';
import { LoginUserDto } from './dtos/LoginUserDto'; // Importa el DTO
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/Users/dtos/CreateUserDto';
import { UsersService } from 'src/Users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor (
  private readonly usersRepository: UsersRepository,
  private readonly usersService: UsersService
) {}

  getAuth() {
    return 'Auth';
  }

  async logUser(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto;

    // 1. Buscar usuario por email
    const user = await this.usersRepository.logUser(email);

    // 2. Validar si el usuario existe
    if (!user) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    // 3. Comparar contraseñas usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    // 4. Generar token JWT
    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 5. Retornar el token
    return { token };
  }

async signUp(user: CreateUserDto): Promise<{ id: string }> {
  // Delegar la creación de usuario al UsersService
  const createdUser = await this.usersService.createUser(user);

  // Retornar solo el id del usuario creado
  return createdUser;
}



}

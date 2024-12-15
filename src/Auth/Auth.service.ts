

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';
import { LoginUserDto } from './dtos/LoginUserDto'; // Importa el DTO
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/Users/dtos/CreateUserDto';
import { UsersService } from 'src/Users/users.service';
import { JwtService } from '@nestjs/jwt';  // Importa JwtService aquí



@Injectable()
export class AuthService {
  constructor (
  private readonly usersRepository: UsersRepository,
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService, 
) {}

  getAuth() {
    return 'Auth';
  }

  
            async logUser(loginUserDto: LoginUserDto): Promise<{ token: string, expiresAt: string }> {
              const { email, password } = loginUserDto;
            
              // Buscar usuario por email
              const user = await this.usersRepository.logUser(email);
              if (!user) {
                throw new UnauthorizedException('Email o contraseña incorrectos');
              }
            
              // Validar contraseña
              const isPasswordValid = await bcrypt.compare(password, user.password);
              if (!isPasswordValid) {
                throw new UnauthorizedException('Email o contraseña incorrectos');
              }
            
              // Asegurarse de que 'roles' sea un array real
              let roles = Array.isArray(user.roles) ? user.roles : [];
              if (typeof user.roles === 'string') {
                try {
                  // Si 'roles' es un string, se convierte a un array real
                  roles = JSON.parse(user.roles);
                  // Asegúrate de que los roles sean un array
                  if (!Array.isArray(roles)) {
                    throw new UnauthorizedException('Error en el formato de roles');
                  }
                } catch (error) {
                  throw new UnauthorizedException('Error al procesar el formato de roles');
                }
              }
            
              // Eliminar cualquier formato incorrecto (en caso de roles como '["admin"]')
              if (roles.length === 1 && typeof roles[0] === 'string') {
                try {
                  roles = JSON.parse(roles[0]);  // Si es algo como '["admin"]', convertirlo en ['admin']
                } catch (error) {
                  throw new UnauthorizedException('Error al procesar el formato de roles');
                }
              }
            
              // Asegurarse de que `user.isAdmin` tenga un tipo claro
              let isAdmin: boolean;
              if (typeof user.isAdmin === 'string') {
                // Convertir 't' a true y 'f' a false
                isAdmin = user.isAdmin === 't';  // 't' se convierte en true
              } else {
                isAdmin = user.isAdmin === true;  // Si ya es booleano, no se cambia
              }
            
              // Generar el payload sin el campo `password`
              const payload = {
                sub: user.id,
                email: user.email,
                roles: roles, // Usar 'roles' correctamente aquí
                isAdmin: isAdmin,  // Asegúrate de que sea un booleano
              };
            
              // Verifica que el secreto de JWT esté bien cargado
              if (!process.env.JWT_SECRET) {
                throw new UnauthorizedException('JWT_SECRET no está configurado');
              }
            
              // Verificar que la carga útil es correcta
              console.log('Payload:', payload);
            
              try {
                // Generar el token JWT
                const token = this.jwtService.sign(payload, {
                  secret: process.env.JWT_SECRET,  // Asegúrate de que el secreto sea correcto
                  expiresIn: '1h',  // Duración de la expiración, en este caso 1 hora
                });
            
                // Calcular la fecha de expiración sin usar moment
                const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();  // Agregar 1 hora a la fecha actual
            
                // Devuelve solo el token y la fecha de expiración
                return { 
                  token,
                  expiresAt,  // Devolver la fecha de expiración junto con el token
                };
              } catch (error) {
                console.error('Error al firmar el token JWT:', error);
                throw new UnauthorizedException('Error al generar el token');
              }
            }
            
            
            
          

async signUp(user: CreateUserDto): Promise<{ id: string }> {
  // Delegar la creación de usuario al UsersService
  const createdUser = await this.usersService.createUser(user);

  // Retornar solo el id del usuario creado
  return createdUser;
}



}

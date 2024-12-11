

import { Injectable} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dtos/CreateUserDto";
import * as bcrypt from 'bcrypt';



@Injectable ({})

export class UsersService {

    constructor (
      private usersRepository: UsersRepository,
    ) {}

    /*getUsers() {
    return this.usersRepository.getUsers();
  }*/
 
    async getUsers() {
      const users = await this.usersRepository.getUsers();
    
      // Excluir el campo password de cada usuario
      return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }
    


  /*getUserById(id: string) {
    return this.usersRepository.getById(id);
  }*/

    async getUserById(id: string) {
      const user = await this.usersRepository.getById(id);
    
      // Excluir el campo password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    async createUser(user: CreateUserDto): Promise</*Omit<Users, 'password'>*/{ id: string }> {
      const { password, ...userData } = user;
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Pasar los datos al repositorio para crear el usuario
      const createdUser = await this.usersRepository.createUser({
        ...userData,
        password: hashedPassword, // Guardar la contraseña hasheada
      });
  
      // Excluir la contraseña antes de retornar el usuario
      /*const { password: _, ...userWithoutPassword } = createdUser;*/
  
      return /*userWithoutPassword*/{ id: createdUser.id };
    }
  
  
  
    async updateUser(id: string, updateData: Partial<CreateUserDto>): Promise</*Omit<Users, 'password'*/{ id: string }> {
      // Invoca al repositorio y devuelve directamente el resultado
      const updateUser/*AGREGADO*/= /*return*/ this.usersRepository.updateUser(id, updateData);

      if (!updateUser) {

        throw new Error (`User with id ${id} not found`);
      }

      return { id:(await updateUser).id };
  }
         
  
  async deleteUser(id: string): Promise</*void*/{ id: string }> {
    const deletedUser/*AGREGADO*/ = await this.usersRepository.deleteUser(id);

    if (!deletedUser) {

      throw new Error (`User with id ${id} not found`);
    }

    return { id };


  }

  async getPaginatedUsers(page: number, limit: number) {
    const [users, totalUsers] = await this.usersRepository.getPaginatedUsers(page, limit);
    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  }

  async getUserWithOrders(userId: string): Promise<any> {
    return this.usersRepository.getUserWithOrders(userId);
  }
}


    
    
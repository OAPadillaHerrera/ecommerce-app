

import { Injectable} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";
import { CreateUserDto } from "./dtos/CreateUserDto";
import { Users } from "./users.entity";

@Injectable ({})

export class UsersService {

    constructor (
      private usersRepository: UsersRepository,
    ) {}

    getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getById(id);
  }

    async createUser(user: CreateUserDto): Promise<Omit<Users, 'password'>> {
      const createdUser: Users = await this.usersRepository.createUser(user); // `createdUser` tiene `password`
      const { password, ...userWithoutPassword } = createdUser; // Filtramos el campo `password`
      return userWithoutPassword; // Devolvemos el objeto sin `password`

  }
  
    async updateUser(id: string, updateData: Partial<CreateUserDto>): Promise<Omit<Users, 'password'>> {
      // Invoca al repositorio y devuelve directamente el resultado
      return this.usersRepository.updateUser(id, updateData);
  }
  
  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
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


    
    
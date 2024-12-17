

import {Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { User } from './user.interface';
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/CreateUserDto";

@Injectable ()

export class UsersRepository {

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}    
  
      /* Obtener todos los usuarios */
      async getUsers(): Promise<Users[]> {
        return this.usersRepository.find(); // Delegar al repositorio interno
      }
    
      async getById(id: string): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { id } });
      }

        async createUser(userDto: CreateUserDto): Promise<Users> {
          const newUser = this.usersRepository.create(userDto);

          return this.usersRepository.save(newUser); 
      }

          async updateUser(id: string, userDto: Partial<CreateUserDto>): Promise<Omit<Users, 'password'>> {
            // Buscar el usuario por su ID
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
        
            // Actualizar los campos proporcionados en el DTO
            Object.assign(user, userDto);
        
            // Guardar los cambios en la base de datos
            const updatedUser = await this.usersRepository.save(user);
        
            // Excluir el campo 'password' de la respuesta
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        }
    
      async deleteUser(id: string): Promise</*void*/{ id: string } | null> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
          throw new Error('User not found');
        }

        return { id };
      }
      
      async getPaginatedUsers(page: number, limit: number): Promise<[Users[], number]> {
        return this.usersRepository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
        });
      }
         

  /* Get user by ID, By only including the ID and his purchase orders Date (`date`).*/
  async getUserWithOrders(userId: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id: userId }, // Search a user by ID.
      relations: ["orders"], // Related orders are included.
    });

    if (!user) {
      throw new Error("User not found.");
    }

    /* To build answer filtered.*/
    const filteredUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      orders: user.orders.map((order) => ({
        id: order.id,
        date: order.date, // Only ID and Date are included in eeach order.
      })),
    };

    return filteredUser;
  }

      

       async logUser(email: string): Promise<Users | null> {
          // Buscar usuario por email en la base de datos
          return await this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'roles'] });
      }

      }

      
    
    



  
  

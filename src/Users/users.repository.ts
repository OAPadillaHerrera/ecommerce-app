

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
    
  private users: User [] = [
    { id: 1, email: "user1@example.com", name: "John Doe", password: "password123", address: "123 Main St", phone: "+34 600123456", country: "Spain", city: "Madrid" },
    { id: 2, email: "user2@example.com", name: "Jane Smith", password: "password456", address: "456 Elm St", phone: "+34 600654321", country: "Spain", city: "Barcelona" },
    { id: 3, email: "user3@example.com", name: "Bob Johnson", password: "password789", address: "789 Pine St", phone: "+34 600789123", country: "Spain", city: "Galicia" },
    { id: 4, email: "user4@example.com", name: "Alice Brown", password: "password000", address: "101 Oak St", phone: "+34 600987654", country: "Spain", city: "Sevilla" },
    { id: 5, email: "user5@example.com", name: "Charlie Green", password: "password111", address: "202 Maple St", phone: "+34 600654987", country: "Spain", city: "Valencia" },
    { id: 6, email: "user6@example.com", name: "Diana Blue", password: "password222", address: "303 Birch St", phone: "+34 600321789", country: "Spain", city: "Bilbao" },
    { id: 7, email: "user7@example.com", name: "Ethan White", password: "password333", address: "404 Cedar St", phone: "+34 600654123", country: "Spain", city: "Granada" },
    { id: 8, email: "user8@example.com", name: "Fiona Black", password: "password444", address: "505 Palm St", phone: "+34 600321654", country: "Spain", city: "Malaga" },
    { id: 9, email: "user9@example.com", name: "George Red", password: "password555", address: "606 Willow St", phone: "+34 600987321", country: "Spain", city: "Cordoba" },
    { id: 10, email: "user10@example.com", name: "Helen Grey", password: "password666", address: "707 Aspen St", phone: "+34 600123789", country: "Spain", city: "Alicante" },
  ];
  
      /* Obtener todos los usuarios */
      async getUsers(): Promise<Users[]> {
        return this.usersRepository.find(); // Delegar al repositorio interno
      }
    
      async getById(id: string): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { id } });
      }

        async createUser(userDto: CreateUserDto): Promise<Users> {
          const newUser = this.usersRepository.create(userDto);
          return this.usersRepository.save(newUser); // Devuelve un `Users`
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
          return await this.usersRepository.findOne({ where: { email } });
      }
      }

      
    
    



  
  

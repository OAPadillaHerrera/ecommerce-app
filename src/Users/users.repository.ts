

/*

This file defines the `UsersRepository` class, which manages interactions with the `Users` entity in a NestJS application. 
It uses TypeORM to perform CRUD operations, handle user-related data, and provide advanced functionalities like paginated 
queries and relations with other entities.

*/

import { Injectable } from "@nestjs/common"; // Import Injectable decorator from NestJS.
import { InjectRepository } from "@nestjs/typeorm"; // Import InjectRepository to inject a TypeORM repository.
import { Users } from "./users.entity"; // Import Users entity for database operations.
import { Repository } from "typeorm"; // Import Repository to interact with the database.
import { CreateUserDto } from "./dtos/CreateUserDto"; // Import DTO for user creation validation.
import { CreateUserDtoAdmin } from "./dtos/CreateUserDtoAdmin";

@Injectable () // Mark this class as injectable for dependency injection.

export class UsersRepository {

  constructor (

    @InjectRepository (Users) // Inject the TypeORM repository for the Users entity.
    private readonly usersRepository: Repository <Users>, // Define the repository as a private readonly property.

  ) {}

  async getUsers (): Promise<Users[]> { // Method to fetch all users.

    return this.usersRepository.find (); // Delegate to the TypeORM repository.

  }

  async getById (id: string): Promise<Users | null> { // Method to fetch a user by ID.

    return this.usersRepository.findOne ({ where: { id } }); // Find a user by ID.

  }

  async createUser (userDto: CreateUserDto): Promise<Users> { // Method to create a new user.

    const newUser = this.usersRepository.create (userDto); // Create a new user instance from the DTO.
    return this.usersRepository.save (newUser); // Save the new user to the database.

  }

  async createUserAdmin (userDtoAdmin: CreateUserDtoAdmin): Promise<Users> { // Method to create a new user.

    const newUser = this.usersRepository.create ({... userDtoAdmin, /*isAdmin: true*/ }


    ); // Create a new user instance from the DTO.
    return this.usersRepository.save (newUser); // Save the new user to the database.

  }

  async updateUser (id: string, userDto: Partial<CreateUserDto>): Promise<Omit<Users, 'password'>> { // Method to update a user.
    const user = await this.usersRepository.findOne ({ where: { id } }); // Find the user by ID.

    if (!user) { // If user is not found.

      throw new Error(`User with ID ${id} not found`); // Throw an error.

    }

    Object.assign (user, userDto); // Update user fields with DTO values.
    const updatedUser = await this.usersRepository.save (user); // Save changes to the database.

    const { password, ...userWithoutPassword } = updatedUser; // Exclude the password field from the response.
    return userWithoutPassword; // Return the user object without the password.

  }

  async deleteUser (id: string): Promise<{ id: string } | null> { // Method to delete a user.

    const result = await this.usersRepository.delete (id); // Attempt to delete the user by ID.

    if (result.affected === 0) { // If no rows were affected.

      throw new Error ('User not found'); // Throw an error.

    }

    return { id }; // Return the ID of the deleted user.

  }

  async getPaginatedUsers (page: number, limit: number): Promise<[Users[], number]> { // Method to fetch paginated users.

    return this.usersRepository.findAndCount ({ // Use TypeORM's findAndCount for pagination.

      skip: (page - 1) * limit, // Calculate the number of records to skip.
      take: limit, // Limit the number of records to fetch.

    });

  }

  async getUserWithOrders (userId: string): Promise<any> { // Method to fetch a user and their related orders.

    const user = await this.usersRepository.findOne ({ // Find a user by ID.

      where: { id: userId }, // Search condition: user ID.
      relations: ["orders"], // Include related orders in the query.

    });

    if (!user) { // If user is not found.

      throw new Error ("User not found."); // Throw an error.

    }

    const filteredUser = { // Build a filtered response object.

      id: user.id, // Include user ID.
      name: user.name, // Include user name.
      email: user.email, // Include user email.

      orders: user.orders.map ((order) => ({ // Map over user orders.

        id: order.id, // Include order ID.
        date: order.date, // Include order date.

      })),

    };

    return filteredUser; // Return the filtered user object.
  }

  async logUser (email: string): Promise<Users | null> { // Method to log in a user by email.

    return await this.usersRepository.findOne ({ // Find a user by email.

      where: { email }, // Search condition: user email.      
      select: ['id', 'email', 'password'/*, 'roles'*/], // Select specific fields for security.

    });

  }
  
}

    



  
  



/* 

This file defines the `UsersService` class, which manages user-related operations in a NestJS application. 
It interacts with the `UsersRepository` to handle database operations and performs additional logic such as hashing passwords.

*/

import { Injectable } from "@nestjs/common"; // Import Injectable decorator from NestJS
import { UsersRepository } from "./users.repository"; // Import UsersRepository for database interactions
import { CreateUserDto } from "./dtos/CreateUserDto"; // Import CreateUserDto for data transfer object validation
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { Users } from "./users.entity";
import { CreateUserDtoAdmin } from "./dtos/CreateUserDtoAdmin";

@Injectable ({}) // Mark this class as a service in the NestJS dependency injection system.

export class UsersService {

  constructor (

    private usersRepository: UsersRepository, // Inject the UsersRepository instance.

  ) {}

    async getUsers () { // Method to retrieve all users.

      const users = await this.usersRepository.getUsers (); // Fetch users from repository.
      return users.map (({ password, isAdmin, ...userWithoutPassword }) => userWithoutPassword); // Exclude sensitive fields like 'password'.

    }

    async getUserById (id: string) { // Method to retrieve a user by ID.

      const user = await this.usersRepository.getById (id); // Fetch user by ID from repository.
      const { password, isAdmin, ...userWithoutPassword } = user; // Exclude sensitive fields like 'password' and 'isAdmin'.
      return userWithoutPassword; // Return user object without the password field.

    }

    async createUser (user: CreateUserDto): Promise <Users> { // Method to create a new user.

      const { password, ...userData } = user; // Destructure user data and password.
      const hashedPassword = await bcrypt.hash (password, 10); // Hash the password before storing it.
      const createdUser = await this.usersRepository.createUser ({ ...userData, password: hashedPassword }); // Create user with hashed password.
      const { password: _, name: __, email: ___, isAdmin: ____, phone: _____, country: ______, address: _______, city: ________, ...userWithoutSensitiveFields } = createdUser
      return userWithoutSensitiveFields as Users;

    }

    async createUserAdmin (user: CreateUserDtoAdmin): Promise<Users> {   
    
      const { password, ...userData } = user; // Destructure user data and password.
      const hashedPassword = await bcrypt.hash (password, 10); // Hash the password before storing it.      
      const createdUserAdmin = await this.usersRepository.createUserAdmin ({ ...userData, password: hashedPassword, isAdmin: true, }); // Create user with hashed password.
      const { password: _, name: __, email: ___, isAdmin: ____, phone: _____, country: ______, address: _______, city: ________, ...userWithoutSensitiveFields } = createdUserAdmin
      return userWithoutSensitiveFields as Users;

    }  

    async updateUser (id: string, updateData: Partial<CreateUserDto>): Promise<{ id: string }> { // Method to update a user's data.

      const updateUser = this.usersRepository.updateUser (id, updateData); // Call repository to update user.

      if (!updateUser) { // Check if the user exists.

        throw new Error (`User with id ${id} not found`); // Throw error if the user is not found.

      }

      return { id: (await updateUser).id }; // Return the updated user's ID.

    }

    async deleteUser (id: string): Promise<{ id: string }> { // Method to delete a user by ID.

        const deletedUser = await this.usersRepository.deleteUser (id); // Call repository to delete user.

        if (!deletedUser) { // Check if the user exists.

          throw new Error (`User with id ${id} not found`); // Throw error if the user is not found.

        }

        return { id }; // Return the ID of the deleted user.

    }

    async getPaginatedUsers (page: number, limit: number) { // Method to retrieve paginated users.

        const [users, totalUsers] = await this.usersRepository.getPaginatedUsers (page, limit); // Fetch paginated users.

        const usersWithoutPassword = users.map (user => { // Map over users to exclude sensitive fields.

            const { password, ...userWithoutPassword } = user; // Exclude 'password' field.
            return userWithoutPassword; // Return user object without the password field.

        });

        return {

            users: usersWithoutPassword, // List of users without passwords
            totalUsers, // Total number of users
            totalPages: Math.ceil (totalUsers / limit), // Calculate total pages
            currentPage: page, // Current page.

        };

    }

    async getUserWithOrders (userId: string): Promise<any> { // Method to retrieve a user and their associated orders.

      return this.usersRepository.getUserWithOrders (userId); // Fetch user and orders from repository.

    }

}



    
    
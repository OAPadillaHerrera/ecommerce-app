

import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";

@Injectable ({})

export class UsersService {

    constructor (private usersRepository: UsersRepository) {}

    getUsers () {

        return this.usersRepository.getUsers ();

    }

    getUserById(id: string) {

        return this.usersRepository.getById (id);
        
    }

    createUser (user: Omit<User, "id">): Promise <{id: number}> {

        return this.usersRepository.createUser (user);

    }

    updateUser (id: number, updateData: Partial <User>) {

        return this.usersRepository.updateUser (id, updateData);

    }

    deleteUser (id: number) {

        return this.usersRepository.deleteUser (id);

    }

    async getPaginatedUsers(page: number, limit: number) {

        console.log (`Service: Page=${page}, Limit=${limit}`);
        const result = await this.usersRepository.getPaginatedUsers (page, limit);
        console.log ("Service: Result =", result);
        return result;

    }
    
    /* Get a user information and his orders.*/   
    async getUserWithOrders(userId: string): Promise<any> {
        try {
            return await this.usersRepository.getUserWithOrders(userId);
            } catch (error) {
            throw new Error(`Error at obtaining a user and his orders: ${error.message}`);
        }
    }
}
    
    
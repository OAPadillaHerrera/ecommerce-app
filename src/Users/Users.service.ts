

import { Injectable } from "@nestjs/common";
import { usersRepository } from "./users.repository";
import { User } from "./user.interface";

@Injectable ({})

export class UsersService {

    constructor (private usersRepository: usersRepository) {}

    getUsers () {

        return this.usersRepository.getUsers ();

    }

    getUserById(id: number) {

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
    
    
}
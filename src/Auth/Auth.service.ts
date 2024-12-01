

import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../Users/users.repository";
import { Login } from "../Users/login.interface";

@Injectable ({})

export class AuthService {

    constructor (private usersRepository: UsersRepository) {}

    getAuth () {

        return "Auth";

    }

    logUser (login: Login) {

        return this.usersRepository.logUser (login);
        
    }

}

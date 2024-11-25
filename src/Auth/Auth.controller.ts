

import {Body, Controller, Get, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Login } from "src/Users/login.interface";

@Controller ("auth")

export class AuthController {

    constructor (private readonly authService: AuthService) {}
    @Get ()   

    getAuth () {

        return this.authService.getAuth ();

    }

    @Post("/signin")

    logUser(@Body () login: Login) {

        return this.authService.logUser (login);

    }

};
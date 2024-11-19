

import {Controller, Get} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller ("Users")

export class UsersController {

    constructor (private readonly usersService: UsersService) {}
    @Get ()
    getUsers () {

        return this.usersService.getUsers ();

    }

};
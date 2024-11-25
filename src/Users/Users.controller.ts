

import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { AuthGuard } from "../Auth/AuthGuard"
import { ValidateGuard } from "src/guards/validate.guard";

@Controller("users") // Cambiado a minúscula para coherencia con las solicitudes

export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    // Obtener todos los usuarios (sin paginación)
    @Get("/all") // Ruta diferenciada
    @UseGuards (AuthGuard)
    getUsers() {
        return this.usersService.getUsers();
    }

    // Obtener usuarios paginados
    @Get ()
    @UseGuards (AuthGuard)

    async getPaginatedUsers (

        @Query ("page") page: string,
        @Query ("limit") limit: string

    ) {

        const pageNumber = parseInt (page, 10) || 1;
        const limitNumber = parseInt (limit, 10) || 5;

        console.log (`Controller: Page=${pageNumber}, Limit=${limitNumber}`); // Depuración
        return this.usersService.getPaginatedUsers (pageNumber, limitNumber);

    }

    @Get (":id")
    @UseGuards (AuthGuard)

    getUserById (@Param("id") id: string) {

        return this.usersService.getUserById(Number(id));

    }

    @Post("/all")
    @UseGuards (ValidateGuard)
    createUser(@Body() user: User) {
        return this.usersService.createUser(user);
    }

    @Put(":id")
    @UseGuards (AuthGuard, ValidateGuard)

    updateUser (@Param("id") id: string, @Body() updateData: Partial<User>) {

        return this.usersService.updateUser (Number(id), updateData);

    }

    @Delete(":id")
    @UseGuards (AuthGuard)

    deleteUser (@Param("id") id: string) {

        return this.usersService.deleteUser(Number(id));

    }

}

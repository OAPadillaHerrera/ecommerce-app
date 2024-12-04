

/*import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query, ValidationPipe} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { AuthGuard, validateRequest } from "../Auth/AuthGuard"
import { ValidateGuard } from "src/guards/validate.guard";
import { CreateUserDto } from "./dtos/CreateUserDto";

@Controller("users") 

export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    // Obtener todos los usuarios (sin paginación)
    @Get("/all") // Ruta diferenciada
    /*@UseGuards (AuthGuard)*/
    /*getUsers() {
        return this.usersService.getUsers();
    }

    // Obtener usuarios paginados
    @Get ()
    /*@UseGuards (AuthGuard)*/

    /*async getPaginatedUsers (

        @Query ("page") page: string,
        @Query ("limit") limit: string

    ) {

        const pageNumber = parseInt (page, 10) || 1;
        const limitNumber = parseInt (limit, 10) || 5;

        console.log (`Controller: Page=${pageNumber}, Limit=${limitNumber}`); // Depuración
        return this.usersService.getPaginatedUsers (pageNumber, limitNumber);

    }

    @Get (":id")
    /*@UseGuards (AuthGuard)*/

    /*getUserById (@Param("id") id: string) {

        return this.usersService.getUserById((id));

    }

    @Post("/all")
    @UseGuards (/*AuthGuard*//*ValidateGuard)

        async createUser(@Body() createUserDto: CreateUserDto) {
            return this.usersService.createUser(createUserDto);
        }
            
    @Put(':id')
    @UseGuards (/*AuthGuard*//*ValidateGuard)

    async updateUser(
    @Param('id') id: string,
    @Body() 
    updateUserDto: CreateUserDto, // Usa CreateUserDto parcialmente
    ) {
        
        return this.usersService.updateUser(id, updateUserDto);
    }
 
    @Delete(":id")
    /*@UseGuards (AuthGuard)*/

    /*deleteUser (@Param("id") id: string) {

        return this.usersService.deleteUser(String(id));

    }

    /* Endpoint to get a user with his purchase orders.*/
    /*@Get(":id/orders")
    async getUserWithOrders(@Param("id") userId: string): Promise<any> {
    return await this.usersService.getUserWithOrders(userId);
    }*/

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard, validateRequest } from '../Auth/AuthGuard';
import { ValidateGuard } from 'src/guards/validate.guard';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UUIDParamDto } from '../dtos/UUIDParamDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios (sin paginación)
  @Get('/all') // Ruta diferenciada
  /*@UseGuards (AuthGuard)*/
  
  getUsers() {
    return this.usersService.getUsers();
  }

  // Obtener usuarios paginados
  @Get()
  /*@UseGuards (AuthGuard)*/
  async getPaginatedUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5;

    console.log(`Controller: Page=${pageNumber}, Limit=${limitNumber}`); // Depuración
    return this.usersService.getPaginatedUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  /*@UseGuards (AuthGuard)*/
  @UsePipes(new ValidationPipe())
  getUserById(@Param() params: UUIDParamDto) {
    return this.usersService.getUserById(params.id);
  }

  @Post('/all')
  @UseGuards(/*AuthGuard*/ ValidateGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(/*AuthGuard*/ ValidateGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param() params: UUIDParamDto,
    @Body() updateUserDto: CreateUserDto, // Usa CreateUserDto parcialmente
  ) {
    return this.usersService.updateUser(params.id, updateUserDto);
  }

  @Delete(':id')
  /*@UseGuards (AuthGuard)*/
  @UsePipes(new ValidationPipe())
  deleteUser(@Param() params: UUIDParamDto) {
    return this.usersService.deleteUser(params.id);
  }

  /* Endpoint to get a user with his purchase orders. */
  @Get(':id/orders')
  @UsePipes(new ValidationPipe())
  async getUserWithOrders(@Param() params: UUIDParamDto): Promise<any> {
    return await this.usersService.getUserWithOrders(params.id);
  }
}






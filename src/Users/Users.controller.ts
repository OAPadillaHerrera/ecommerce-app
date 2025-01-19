

/**
 
 * This file defines the `UsersController` class, which handles user-related operations and routes.
 * It provides endpoints for CRUD operations, user retrieval with pagination, and managing user-related data, 
 * such as associating users with their orders. Authentication, validation, and role-based access control 
 * are implemented for secure handling of requests.
 
 */

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query, ValidationPipe, UsePipes, Req, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service'; // Service for user-related business logic.
import { AuthGuard } from '../Auth/AuthGuard'; // Guard for authentication.
import { ValidateGuard } from 'src/guards/validate.guard'; // Guard for additional validation.
import { CreateUserDto } from './dtos/CreateUserDto'; // DTO for user creation and Login.
import { UUIDParamDto } from '../dtos/UUIDParamDto'; // DTO for validating UUID parameters.
import { Roles } from 'src/decorators/roles.decorators'; // Decorator for role-based access.
import { Role } from 'src/roles.enum'; // Enum for role definitions.
import { RolesGuard } from 'src/guards/roles.guard'; // Guard for role-based access control.
import { ApiBearerAuth } from '@nestjs/swagger'; // Swagger decorator for API authentication.
import { CreateUserDtoAdmin } from './dtos/CreateUserDtoAdmin';

@Controller ('users') // Controller for user routes.

export class UsersController {
  
  constructor (private readonly usersService: UsersService) {} // Injects UsersService.

  @ApiBearerAuth ()
  @Get ('/all') // Endpoint: GET /users/all.
  @UseGuards (AuthGuard, RolesGuard) // Requires authentication.
  @Roles(Role.Admin) // // Requires Admin role.

  async getUsers () {

    return this.usersService.getUsers (); // Fetches all users.

  }

  @ApiBearerAuth ()
  @Get () // Endpoint: GET /users with pagination.
  @Roles (Role.Admin) // Requires Admin role.
  @UseGuards (AuthGuard, RolesGuard) // Requires authentication and role validation.

  async getPaginatedUsers (

    @Query ('page') page: string, // Page number query.
    @Query ('limit') limit: string, // Items per page query.
    
  ) {

    const pageNumber = parseInt (page, 10) || 1; // Default page number.
    const limitNumber = parseInt(limit, 10) || 5; // Default limit.
    if (isNaN (pageNumber) || pageNumber < 1) throw new Error ('Invalid page number');
    if (isNaN (limitNumber) || limitNumber < 1) throw new Error ('Invalid limit number');

    return this.usersService.getPaginatedUsers (pageNumber, limitNumber/*, isAdminFlag*/);

  }

  @ApiBearerAuth ()

  @Get (':id') // Endpoint: GET /users/:id.
  @UseGuards (AuthGuard) // Requires authentication.
  @UsePipes (new ValidationPipe()) // Validates incoming parameters.

  async getUserById (@Req() req: any, @Param() params: UUIDParamDto) {

    const payloadUser = req.user; // Retrieves authenticated user payload.
    const dbUser = await this.usersService.getUserById (params.id); // Fetches user by ID.
    return { ...dbUser, exp: payloadUser.exp }; // Returns user data with token expiration.

  }

  @ApiBearerAuth ()
  @Post ('/all') // Endpoint: POST /users/all.
  @UseGuards (/*AuthGuard,*/ ValidateGuard) // Requires authentication and validation.

  async createUser (@Body() createUserDto: CreateUserDto) {

    return this.usersService.createUser (createUserDto); // Creates a new user.

  }

  @ApiBearerAuth()
  @Post('/admin') // Ruta específica para crear un usuario admin.
  @UseGuards(ValidateGuard, RolesGuard) // Guard para proteger la ruta.
  async createAdminUser(@Body() createUserDtoAdmin: CreateUserDtoAdmin) {
  return this.usersService.createUserAdmin(createUserDtoAdmin); // Llamada al servicio.
  }
    
  @ApiBearerAuth ()
  @Put (':id') // Endpoint: PUT /users/:id
  @UseGuards (AuthGuard, ValidateGuard) // Requires authentication and validation.
  @UsePipes (new ValidationPipe()) // Validates incoming parameters.

  async updateUser ( 
    
    @Param () params: UUIDParamDto, // User ID parameter.
    @Body () updateUserDto: CreateUserDto, // Updated user details.

  ) {

    return this.usersService.updateUser (params.id, updateUserDto); // Updates user by ID.

  }

  @ApiBearerAuth ()
  @Delete (':id') // Endpoint: DELETE /users/:id.
  @UseGuards (AuthGuard) // Requires authentication.
  @UsePipes (new ValidationPipe()) // Validates incoming parameters.

  async deleteUser (@Param () params: UUIDParamDto) {

    return this.usersService.deleteUser (params.id); // Deletes user by ID.

  }

  @Get (':id/orders') // Endpoint: GET /users/:id/orders.
  /*@UseGuards (AuthGuard) // Requires authentication.*/
  @UsePipes (new ValidationPipe()) // Validates incoming parameters.

  async getUserWithOrders (@Param () params: UUIDParamDto): Promise<any> {

    return await this.usersService.getUserWithOrders (params.id); // Fetches user and their orders.

  }

}





/**
 * This file defines the `UsersController` class, which handles all user-related 
 * operations and routes in the application.
 * 
 * It provides endpoints for CRUD operations, user retrieval, pagination, and 
 * additional functionality such as associating users with their orders.
 */

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
  Req,

} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/AuthGuard';
import { ValidateGuard } from 'src/guards/validate.guard';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UUIDParamDto } from '../dtos/UUIDParamDto';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller ('users')

export class UsersController {

  /**
   * Initializes the `UsersController` with an instance of `UsersService`.
   * 
   * @param usersService - Service for managing user-related business logic.
   */

  constructor (private readonly usersService: UsersService) {}

  /**
   * Handles `GET /users/all` requests.
   * 
   * Retrieves all users without pagination. Requires authentication.
   * 
   * @returns A list of all users.
   */

  @ApiBearerAuth ()
  @Get ('/all')
  @UseGuards (AuthGuard)

  getUsers () {

    return this.usersService.getUsers();

  }

  /**
   * Handles `GET /users` requests with pagination and optional filtering.
   * 
   * Requires the `Admin` role and authentication. Validates pagination parameters.
   * 
   * @param page - The page number for pagination.
   * @param limit - The maximum number of users per page.
   * @param includeisAdmin - Whether to include admin users in the results.
   * @returns A paginated list of users.
   */

  @ApiBearerAuth ()
  @Get ()
  @Roles (Role.Admin)
  @UseGuards (AuthGuard, RolesGuard)

  async getPaginatedUsers (

    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('includeisAdmin') includeisAdmin: string,

  ) {

    const pageNumber = parseInt (page, 10) || 1;
    const limitNumber = parseInt (limit, 10) || 5;

    if (isNaN (pageNumber) || pageNumber < 1) {

      throw new Error('Invalid page number');

    }

    if (isNaN (limitNumber) || limitNumber < 1) {

      throw new Error ('Invalid limit number');

    }

    let isAdminFlag = false;

    if (includeisAdmin === 't') {

      isAdminFlag = true;

    } else if (includeisAdmin !== undefined && includeisAdmin !== 'false') {

      throw new Error('Invalid value for includeisAdmin, expected "true" or "false"');

    }

    return this.usersService.getPaginatedUsers(pageNumber, limitNumber, isAdminFlag);

  }

  /**
   * Handles `GET /users/admin` requests.
   * 
   * Retrieves a protected message. Requires the `Admin` role.
   * 
   * @returns A message indicating access to a protected route.
   */

  @ApiBearerAuth ()
  @Get ('admin')
  @Roles (Role.Admin)
  @UseGuards (AuthGuard, RolesGuard)

  getAdmin () {

    return 'Protected route';

  }

  /**
   * Handles `GET /users/:id` requests.
   * 
   * Retrieves a specific user by ID. Validates the ID and includes token expiration details.
   * 
   * @param req - The incoming request object containing the user's token.
   * @param params - The parameters containing the user's ID.
   * @returns The user object with additional information.
   */

  @ApiBearerAuth ()
  @Get (':id')
  @UseGuards (AuthGuard)
  @UsePipes (new ValidationPipe())

  async getUserById (@Req () req: any, @Param () params: UUIDParamDto) {

    const payloadUser = req.user;
    const dbUser = await this.usersService.getUserById(params.id);

    return {
      ...dbUser,
      exp: payloadUser.exp,
    };
  }

  /**
   * Handles `POST /users/all` requests.
   * 
   * Creates a new user. Requires authentication and validation.
   * 
   * @param createUserDto - The DTO containing user creation details.
   * @returns The created user object.
   */
  
  @ApiBearerAuth ()
  @Post('/all')
  @UseGuards(AuthGuard, ValidateGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Handles `PUT /users/:id` requests.
   * 
   * Updates an existing user's details. Requires authentication and validation.
   * 
   * @param params - The parameters containing the user's ID.
   * @param updateUserDto - The DTO containing the updated user details.
   * @returns The updated user object.
   */

  @ApiBearerAuth ()
  @Put (':id')
  @UseGuards (AuthGuard, ValidateGuard)
  @UsePipes (new ValidationPipe())

  async updateUser (

    @Param () params: UUIDParamDto,
    @Body () updateUserDto: CreateUserDto,

  ) {

    return this.usersService.updateUser (params.id, updateUserDto);

  }


  /**
   * Handles `DELETE /users/:id` requests.
   * 
   * Deletes a user by ID. Requires authentication and validation.
   * 
   * @param params - The parameters containing the user's ID.
   * @returns A confirmation message or the deleted user's ID.
   */

  @ApiBearerAuth ()
  @Delete (':id')
  @UseGuards (AuthGuard)
  @UsePipes (new ValidationPipe())

  deleteUser (@Param () params: UUIDParamDto) {

    return this.usersService.deleteUser (params.id);

  }


  /**
   * Handles `GET /users/:id/orders` requests.
   * 
   * Retrieves a user along with their associated purchase orders. 
   * 
   * @param params - The parameters containing the user's ID.
   * @returns The user object with their associated orders.
   */

  @Get (':id/orders')
  @UsePipes (new ValidationPipe ())

  async getUserWithOrders (@Param () params: UUIDParamDto): Promise<any> {

    return await this.usersService.getUserWithOrders(params.id);

  }
  
}




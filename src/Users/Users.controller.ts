

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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios (sin paginación)
  @Get('/all') // Ruta diferenciada
  @UseGuards (AuthGuard)
  
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
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
async getUserById(@Req() req: any, @Param() params: UUIDParamDto) {
  const payloadUser = req.user; // Confía en que 'user' existe
  const dbUser = await this.usersService.getUserById(params.id);

  return {
    ...dbUser,
    exp: payloadUser.exp, // Incluye el campo exp
  };
}
  

  @Post('/all')
  @UseGuards(/*AuthGuard*/ ValidateGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard, ValidateGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param() params: UUIDParamDto,
    @Body() updateUserDto: CreateUserDto, 
  ) {
    return this.usersService.updateUser(params.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards (AuthGuard)
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






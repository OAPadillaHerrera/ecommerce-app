

import { Module } from '@nestjs/common';
import { ProductsModule } from './Products/Products.module';
import { UsersModule } from './Users/Users.module';
import { AuthModule } from './Auth/Auth.module';
import { ProductsController } from './Products/Products.controller';
import { UsersController } from './Users/Users.controller';
import { ProductsService } from './Products/Products.service';
import { UsersService } from './Users/Users.service';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule],
  controllers: [],
  providers: []
})

export class AppModule {}
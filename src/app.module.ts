

import { Module } from '@nestjs/common';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule],
  controllers: [],
  providers: []
})

export class AppModule {}
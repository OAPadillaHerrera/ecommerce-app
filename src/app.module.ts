

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Users/users.module';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { typeOrmConfig } from './config/typeorm';

@Module({
  imports: [
    // Configuración global para variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig], // Carga el archivo de configuración
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const typeormConfig = configService.get('typeorm');
        console.log('TypeORM Config:', typeormConfig); // Log para verificar la configuración

        if (!typeormConfig || !typeormConfig.type) {
          throw new Error('Database configuration is invalid. Check your .env file and configuration.');
        }

        return {
          ...typeormConfig,
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),

    // Otros módulos de tu aplicación
    ProductsModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


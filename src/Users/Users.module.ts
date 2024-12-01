

import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository} from "./users.repository";
import { Users } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module ({

    imports: [
        TypeOrmModule.forFeature([Users]),
      ],

    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: [UsersRepository],

})

export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /*consumer.apply(LoggerMiddleware).forRoutes ("Users");*/
    }
}
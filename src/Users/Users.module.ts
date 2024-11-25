

import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { LoggerMiddleware } from "src/Middlewares/logger.middleware";
import { usersRepository } from "./users.repository";

@Module ({

    providers: [UsersService, usersRepository],
    controllers: [UsersController]

})

export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /*consumer.apply(LoggerMiddleware).forRoutes ("Users");*/
    }
}
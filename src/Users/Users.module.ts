

import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { LoggerMiddleware } from "src/Middlewares/logger.middleware";
import { UsersRepository } from "./Users.repository";

@Module ({

    providers: [UsersService, UsersRepository],
    controllers: [UsersController]

})

export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /*consumer.apply(LoggerMiddleware).forRoutes ("Users");*/
    }
}
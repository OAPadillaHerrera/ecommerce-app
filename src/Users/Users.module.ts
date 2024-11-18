

import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { UsersService } from "./Users.service";
import { UsersController } from "./Users.controller";
import { LoggerMiddleware } from "src/Middlewares/Logger.middleware";

@Module ({

    providers: [UsersService],
    controllers: [UsersController]

})

export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /*consumer.apply(LoggerMiddleware).forRoutes ("Users");*/
    }
}


import {Module} from "@nestjs/common";
import {AuthService} from "./Auth.service";
import { AuthController } from "./Auth.controller";


@Module ({

    providers: [AuthService],
    controllers: [AuthController],
})

export class AuthModule {}
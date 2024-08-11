import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {Subscription} from "../subscription/entities/subsription.entity";
import {UserController} from "./user.controller";

@Module({
    imports: [ TypeOrmModule.forFeature([User, Subscription])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

import {Module} from "@nestjs/common";
import {SubscriptionsController} from "./subsription.controller";
import {SubsriptionService} from "./subsription.service";
import {StripeModule} from "../stripe/stripe.module";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Subscription} from "./entities/subsription.entity";

@Module({
    imports: [StripeModule, UserModule, TypeOrmModule.forFeature([User, Subscription])],
    controllers: [SubscriptionsController],
    providers: [SubsriptionService],
    exports: [SubsriptionService],
})
export class SubscriptionModule {}

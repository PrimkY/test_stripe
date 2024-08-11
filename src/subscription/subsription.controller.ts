import {Controller, Post, Body, Get} from '@nestjs/common';
import {StripeService} from "../stripe/stripe.service";
import {UserService} from "../user/user.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../user/entities/user.entity";
import {Subscription} from "./entities/subsription.entity";
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SubsriptionService} from "./subsription.service";

@ApiTags('subscription')
@Controller('subscriptions')
export class SubscriptionsController {
    constructor(
        private subscriptionService: SubsriptionService,
    ) {}

    @ApiOperation({ summary: 'Creating subscription' })
    @ApiResponse({ status: 201, type: Subscription })
    @Post()
    async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {

        return this.subscriptionService.createSubscription(createSubscriptionDto)
    }

    @ApiOperation({summary: 'getting all subscriptions'})
    @ApiResponse({status: 200, type: [Subscription]})
    @Get()
    async getSubscriptions(){
        return this.subscriptionService.getSubscriptions()
    }
}

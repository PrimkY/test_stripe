import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subsription.service';

@ApiTags('subscription')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: 'Creating subscription' })
  @ApiResponse({ status: 201, type: Subscription })
  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'getting all subscriptions' })
  @ApiResponse({ status: 200, type: [Subscription] })
  @Get()
  async getSubscriptions() {
    return this.subscriptionService.getSubscriptions();
  }

  @ApiOperation({ summary: 'Method to get one subscription by id' })
  @ApiResponse({ status: 200, type: Subscription })
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.subscriptionService.findById(id);
  }
}

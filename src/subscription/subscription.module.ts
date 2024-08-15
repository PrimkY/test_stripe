import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subsription.controller';
import { SubscriptionService } from './subsription.service';
import { StripeModule } from '../stripe/stripe.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';

@Module({
  imports: [StripeModule, UserModule, TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}

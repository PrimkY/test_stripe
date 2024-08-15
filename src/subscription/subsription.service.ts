import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  createSubscription(data: Partial<Subscription>) {
    const subscription = this.subscriptionsRepository.create(data);
    return this.subscriptionsRepository.save(subscription);
  }

  getSubscriptions() {
    return this.subscriptionsRepository.find();
  }

  findById(id: number): Promise<Subscription> {
    return this.subscriptionsRepository.findOne({ where: { id } });
  }
}

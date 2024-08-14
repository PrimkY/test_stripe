import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubsriptionService {
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
}

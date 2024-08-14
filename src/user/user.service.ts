import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Subscription } from '../subscription/entities/subscription.entity';
import { AddSubscriptionDto } from './dto/add-subscription.dto';
import { UserSubscription } from './entities/user-subscription.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(UserSubscription)
    private userSubscriptionsRepository: Repository<UserSubscription>,
  ) {}

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async addSubscription( dto: AddSubscriptionDto
  ): Promise<UserSubscription> {
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    if(!user) {
      throw new NotFoundException()
    }
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: dto.subscriptionId },
    });
    if(!subscription) {
      throw new NotFoundException()
    }
    console.log(dto)
    const result =  this.userSubscriptionsRepository.save(dto);
    console.log(result)
    return await result;
  }
}

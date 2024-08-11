import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "./entities/user.entity";
import {Subscription} from "../subscription/entities/subsription.entity";
import {AddSubscriptionDto} from "./dto/add-subscription.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Subscription)
        private subscriptionsRepository: Repository<Subscription>,
    ) {}


    findById(id:number): Promise<User> {
        return this.usersRepository.findOne({where: {id}});
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email }});
    }

    create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async addSubscription(userId: number, SubscriptionId: number): Promise<Subscription> {
        const user = await this.usersRepository.findOne({where: {id: userId }});
        const subscription = await this.subscriptionsRepository.findOne({ where: {id: SubscriptionId}})
        return this.subscriptionsRepository.save(subscription);
    }
}

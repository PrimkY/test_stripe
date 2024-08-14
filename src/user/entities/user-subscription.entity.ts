import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Entity('user_subscription')
export class UserSubscription {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'subscription_id' })
  subscription_id: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => User, (user) => user.subscription, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'subscription_id', referencedColumnName: 'id' }])
  subscriptions: Subscription[];
}

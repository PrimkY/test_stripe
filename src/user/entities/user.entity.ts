import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  isSubscriptionActive: boolean;

  @ManyToMany(() => Subscription, (subscription) => subscription.users)
  @JoinTable({
    name: 'user_subscription',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subscription_id',
      referencedColumnName: 'id',
    },
  })
  subscriptions?: Subscription[];
}

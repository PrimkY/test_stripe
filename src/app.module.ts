import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";
import {UserModule} from "./user/user.module";
import {SubscriptionModule} from "./subscription/subscription.module";
import {StripeModule} from "./stripe/stripe.module";
import {User} from "./user/entities/user.entity";
import {Subscription} from "./subscription/entities/subsription.entity";

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        entities: [User, Subscription],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([]),
      UserModule,
      SubscriptionModule,
      StripeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

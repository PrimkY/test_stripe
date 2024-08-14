import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Stripe from 'stripe';
import * as process from 'process';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCustomer(email: string) {
    try {
      return await this.stripe.customers.create({ email });
    } catch (error) {
      throw new HttpException(
        'Stripe Error: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createSubscription(customerId: string, type: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: type }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
    } catch (error) {
      throw new HttpException(
        'Stripe Error: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPaiment(
    customerId: string,
    price: string,
    amount: string,
    subsriptionId: string,
  ) {
    try {
    } catch (error) {
      throw new HttpException(
        'Stripe Error: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Stripe from 'stripe';
import * as process from 'process';
import { CreateStripeProductDto } from './dto/CreateStripeProductDto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async createProduct(dto: CreateStripeProductDto) {
    try {
      const product = await this.stripe.products.create({
        name: dto.name,
      });
      const price = await this.stripe.prices.create({
        product: product.id,
        unit_amount: dto.unit_amount,
        currency: dto.currency,
        recurring: dto.recurring,
      });
      return price;
    } catch (error) {
      throw new HttpException(
        'Stripe Error: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createCustomer(dto: User) {
    try {
      return await this.stripe.customers.create({
        email: dto.email,
        name: dto.name,
        metadata: {
          userId: dto.id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Stripe Error: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async paymentMethod(dto: User) {
    const method = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2030,
        cvc: '158',
      },
    });
    await this.stripe.paymentMethods.attach(method.id, {
      customer: JSON.stringify(dto.id),
    });
    await this.stripe.customers.update(JSON.stringify(dto.id), {
      invoice_settings: { default_payment_method: method.id },
    });
  }

  async createSubscription(customerId: string, price_id: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: price_id }],
        expand: ['latest_invoice.payment_intent'],
      });
    } catch (error) {
      throw new HttpException(
        'Stripe Error: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

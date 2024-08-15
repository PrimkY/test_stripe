export class CreateStripeProductDto {
  name: string;
  unit_amount: number;
  currency: string;
  recurring: { interval: 'week' };
}

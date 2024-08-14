import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 1000,
    description: 'required field / not uniq / number',
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    example: 'year',
    description:
      'Base monthly/yearly subscription with daily paying. Required field / not uniq / string',
  })
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({
    example: 'week',
    description:
      'Periodicity of billing by the way of subscription. Required field / not uniq / string',
  })
  @IsNotEmpty()
  readonly pereodicity: string;

  @ApiProperty({
    example: 'false',
    description: 'required field / not uniq / boolean',
  })
  @IsNotEmpty()
  readonly isActive: boolean;
}

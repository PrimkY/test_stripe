import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Karina',
    description: 'required name / not uniq / string',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'someemail@gmail.com',
    description: 'uniq and require email / string',
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'myStockPass123',
    description: 'not  uniq / string',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: false,
    description:
      'changed to true while payments are success. Not  uniq / boolean',
  })
  @IsNotEmpty()
  readonly isSubscriptionActive: boolean;
}

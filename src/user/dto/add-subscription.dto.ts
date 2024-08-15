import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddSubscriptionDto {
  @ApiProperty({
    example: 2,
    description: 'find user by that id to add subscription / required',
  })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    example: 3,
    description: 'add subscription with that id to user / required',
  })
  @IsNotEmpty()
  readonly subscriptionId: number;
}

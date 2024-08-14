import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddSubscriptionDto } from './dto/add-subscription.dto';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, type: [User] })
  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({ summary: 'Method to get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Method to add subscription by id to user by id' })
  @ApiResponse({ status: 200, type: AddSubscriptionDto })
  @Put('/add')
  addSubscription(@Body() addSubscriptionDto: AddSubscriptionDto) {
    return this.userService.addSubscription(
      addSubscriptionDto.userId,
      addSubscriptionDto.subscriptionId,
    );
  }
}

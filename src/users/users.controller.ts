import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post('register')
  async createUser(@Body() createUser: any) {
    return await this.usersService.createUser(createUser);
  }

  //   @Post('login')
  //   async login(@Body() loginUser: any) {}
}

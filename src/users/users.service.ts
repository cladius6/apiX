import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.user.findMany();
  }

  async createUser(createUserDto: any) {
    return this.prismaService.user.create({ data: { ...createUserDto } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async createUser(createUserDto: any) {
    return this.prismaService.user.create({ data: { ...createUserDto } });
  }

  //   async singIn(email: string, password: string) {
  //     const user = await this.findOne(email);
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (user && isPasswordValid) {
  //     }
  //   }

  private async findOne(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}

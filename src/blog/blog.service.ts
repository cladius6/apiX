import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dtos/blog.dtos';

@Injectable()
export class BlogService {
  constructor(private readonly prismaService: PrismaService){}
  async create(createBlogDto: CreateBlogDto) {
    return this.prismaService.blog.create({ data: {...createBlogDto} });
  }

  async getAll(): Promise<Blog[]> {
    return this.prismaService.blog.findMany();
  }
}

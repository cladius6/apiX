import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dtos/blog.dtos';

@Injectable()
export class BlogService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createBlogDto: CreateBlogDto) {
    return this.prismaService.blog.create({ data: { ...createBlogDto } });
  }

  async getAll(): Promise<Blog[]> {
    return this.prismaService.blog.findMany();
  }

  async getOne(id: string): Promise<Blog> {
    return this.prismaService.blog.findFirst({ where: { id } });
  }

  async update(data: Blog): Promise<Blog> {
    return this.prismaService.blog.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string): Promise<Blog> {
    return this.prismaService.blog.delete({ where: { id } });
  }
}

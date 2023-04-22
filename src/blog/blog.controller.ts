import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/blog.dtos';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return await this.blogService.create(createBlogDto)
  }

  @Get()
  async getAll(): Promise<Blog[]> {
    return await this.blogService.getAll()
  }
}

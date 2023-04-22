import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Blog } from '@prisma/client';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/blog.dtos';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return await this.blogService.create(createBlogDto);
  }

  @Get()
  async getAll(): Promise<Blog[]> {
    return await this.blogService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Blog> {
    return await this.blogService.getOne(id);
  }

  @Put()
  async updateOne(@Body() blog: Blog) {
    return await this.blogService.update(blog);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.blogService.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppModule, PrismaModule, BlogModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

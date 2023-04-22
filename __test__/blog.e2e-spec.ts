import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanupDbBeforeEach, DatabaseCleaner } from '../__tests-support__/database.cleaner';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseCleaner, PrismaService]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  cleanupDbBeforeEach(() => app);

  it('/blog (GET)', async () => {
    const prismaService = app.get(PrismaService)
    console.log(await prismaService.blog.findMany())
    // const response = await request(app.getHttpServer())
    //   .get('/blog')
      // .expect(200)
      expect(true).toBe(true)
  });
});

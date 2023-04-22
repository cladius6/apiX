import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { PrismaService } from '../prisma/prisma.service';
import {
  cleanupDbBeforeEach,
  DatabaseCleaner,
} from '../__tests-support__/database.cleaner';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseCleaner, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  cleanupDbBeforeEach(() => app);

  it('/blog (GET) should return all blogs correctly', async () => {
    await request(app.getHttpServer()).get('/blog').expect(200).expect([]);
    const prismaService = app.get(PrismaService);
    await prismaService.blog.create({
      data: {
        title: 'Test',
        content: 'Lorem ipsum!',
      },
    });
    const { body, statusCode } = await request(app.getHttpServer()).get(
      '/blog',
    );
    expect(statusCode).toBe(200);
    expect(body).toEqual([
      {
        id: expect.any(String),
        title: 'Test',
        content: 'Lorem ipsum!',
      },
    ]);
  });

  it('/blog (POST) should create blog correctly', async () => {
    const { body, statusCode } = await request(app.getHttpServer())
      .post('/blog')
      .send({
        title: 'Test blog',
        content: 'Lorem ipsum test!',
      });
    expect(statusCode).toBe(201);
    expect(body).toEqual({
      id: expect.any(String),
      title: 'Test blog',
      content: 'Lorem ipsum test!',
    });
  });
});

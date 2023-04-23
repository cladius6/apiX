import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { PrismaService } from '../prisma/prisma.service';
import {
  clearDatabase,
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

  beforeEach(async () => {
    await clearDatabase(app);
  });

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

  it('/blog/:id (GET) should return blog by id correctly', async () => {
    const prismaService = app.get(PrismaService);
    const { id } = await prismaService.blog.create({
      data: {
        title: 'Test test',
        content: 'Lorem ipsum blog id!',
      },
    });
    const { body, statusCode } = await request(app.getHttpServer()).get(
      `/blog/${id}`,
    );
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      id: expect.any(String),
      title: 'Test test',
      content: 'Lorem ipsum blog id!',
    });
  });

  it('/blog (PUT) should update existing blog correctly', async () => {
    const prismaService = app.get(PrismaService);
    const { id } = await prismaService.blog.create({
      data: {
        title: 'Test test',
        content: 'Lorem ipsum blog id!',
      },
    });
    const { body, statusCode } = await request(app.getHttpServer())
      .put(`/blog`)
      .send({
        id,
        title: 'Test test updated',
        content: 'New content added',
      });
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      id,
      title: 'Test test updated',
      content: 'New content added',
    });
  });

  it('/blog/:id (DELETE) should delete existing blog correctly', async () => {
    const prismaService = app.get(PrismaService);
    const data = await prismaService.blog.create({
      data: {
        title: 'Test test',
        content: 'Lorem ipsum blog id!',
      },
    });
    const { body, statusCode } = await request(app.getHttpServer()).delete(
      `/blog/${data.id}`,
    );
    expect(statusCode).toBe(200);
    expect(body).toEqual(data);
  });
});

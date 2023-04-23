import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { PrismaService } from '../prisma/prisma.service';
import {
  cleanupDbBeforeEach,
  DatabaseCleaner,
} from '../__tests-support__/database.cleaner';
import { Role } from '@prisma/client';

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

  it('/users (GET) should return all users correctly', async () => {
    await request(app.getHttpServer()).get('/users').expect(200).expect([]);
    const prismaService = app.get(PrismaService);
    await prismaService.user.create({
      data: {
        email: 'test@test.com',
        password: 'test123456',
      },
    });
    const { body, statusCode } = await request(app.getHttpServer()).get(
      '/users',
    );
    expect(statusCode).toBe(200);
    expect(body).toEqual([
      {
        id: expect.any(String),
        email: 'test@test.com',
        name: null,
        password: expect.any(String),
        role: Role.USER,
      },
    ]);
  });

  it('/users/register (POST) should create user correctly', async () => {
    await request(app.getHttpServer()).get('/users').expect(200).expect([]);
    const { body, statusCode } = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        email: 'testa@test.com',
        password: '12zx',
      });
    expect(statusCode).toBe(201);
    expect(body).toEqual({
      id: expect.any(String),
      email: 'testa@test.com',
      name: null,
      password: expect.any(String),
      role: Role.USER,
    });
  });
});

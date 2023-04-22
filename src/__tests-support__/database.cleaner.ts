import { INestApplication, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabaseCleaner {
  constructor(private prismaService: PrismaService) {}

  public async cleanup() {
    const tables = Prisma.dmmf.datamodel.models
      .map((model) => model.dbName || model.name)
      .filter((name) => name !== '_prisma_migrations');

    return Promise.all(
      tables.map((table) =>
        this.prismaService.$executeRawUnsafe(
          `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`,
        ),
      ),
    );
  }
}

export const clearDatabase = async (app: INestApplication): Promise<void> => {
  const databaseCleaner = app.get(DatabaseCleaner);
  await databaseCleaner.cleanup();
};

export const cleanupDbBeforeEach = (appGetter: () => INestApplication) => {
  beforeEach(async () => {
    await clearDatabase(appGetter());
  });
};

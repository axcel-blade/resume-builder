export class PrismaClient {
  $connect() {
    return Promise.resolve();
  }

  $disconnect() {
    return Promise.resolve();
  }
}

export type Prisma = {
  JsonValue: unknown;
  InputJsonValue: unknown;
};

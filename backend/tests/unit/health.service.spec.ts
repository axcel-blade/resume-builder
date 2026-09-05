import { HealthService } from '../../src/health/health.service';
import { PrismaService } from '../../src/repositories/prisma.service';

describe('HealthService', () => {
  it('reports memory mode when Prisma is disabled', async () => {
    const prisma = { enabled: false, client: null } as unknown as PrismaService;
    const service = new HealthService(prisma);
    const ready = await service.ready();

    expect(ready.status).toBe('ok');
    expect(ready.checks.persistence.mode).toBe('memory');
    expect(service.live().status).toBe('ok');
  });

  it('marks ready as error when Postgres probe fails', async () => {
    const prisma = {
      enabled: true,
      client: {
        $queryRaw: jest.fn().mockRejectedValue(new Error('connection refused')),
      },
    } as unknown as PrismaService;
    const service = new HealthService(prisma);
    const ready = await service.ready();

    expect(ready.status).toBe('error');
    expect(ready.checks.persistence.status).toBe('error');
  });
});

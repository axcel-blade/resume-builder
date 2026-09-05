import { HealthController } from '../../src/health/health.controller';
import { HealthService } from '../../src/health/health.service';

describe('HealthController', () => {
  const healthService = {
    live: jest.fn().mockReturnValue({
      status: 'ok',
      service: 'vita-forge-backend',
      timestamp: '2026-09-05T00:00:00.000Z',
    }),
    ready: jest.fn().mockResolvedValue({
      status: 'ok',
      service: 'vita-forge-backend',
      version: '0.8.0',
      timestamp: '2026-09-05T00:00:00.000Z',
      uptimeSeconds: 12,
      checks: {
        process: 'ok',
        persistence: { mode: 'memory', status: 'ok' },
      },
    }),
  };

  const controller = new HealthController(healthService as unknown as HealthService);

  it('returns a living process payload', () => {
    const result = controller.check();
    expect(result.status).toBe('ok');
    expect(result.service).toBe('vita-forge-backend');
  });

  it('returns readiness with persistence mode', async () => {
    const res = { status: jest.fn() };
    const result = await controller.ready(res);
    expect(result.status).toBe('ok');
    expect(result.checks.persistence.mode).toBe('memory');
    expect(res.status).not.toHaveBeenCalled();
  });
});

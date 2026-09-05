import { HealthController } from '../health/health.controller';

describe('HealthController', () => {
  it('returns a living process payload', () => {
    const controller = new HealthController();
    const result = controller.check();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('vita-forge-backend');
    expect(result.timestamp).toEqual(expect.any(String));
  });
});

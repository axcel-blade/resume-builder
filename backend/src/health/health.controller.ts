import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /** GET /api/health — liveness (always 200 if the process answers). */
  @Get()
  @HttpCode(HttpStatus.OK)
  check() {
    return this.healthService.live();
  }

  /** GET /api/health/live — alias for probes that expect /live. */
  @Get('live')
  @HttpCode(HttpStatus.OK)
  live() {
    return this.healthService.live();
  }

  /**
   * GET /api/health/ready — readiness including persistence.
   * Returns 503 when Postgres is configured but unreachable.
   */
  @Get('ready')
  async ready(@Res({ passthrough: true }) res: { status: (code: number) => void }) {
    const report = await this.healthService.ready();
    if (report.status === 'error') {
      res.status(HttpStatus.SERVICE_UNAVAILABLE);
    }
    return report;
  }
}

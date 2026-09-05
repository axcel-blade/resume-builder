import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  list() {
    return this.templatesService.list();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    return this.templatesService.getById(id);
  }
}

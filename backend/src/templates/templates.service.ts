import { Injectable, NotFoundException } from '@nestjs/common';
import { MarketplaceTemplate, TEMPLATE_CATALOG } from './template-catalog';

/** Read-only access to `TEMPLATE_CATALOG` (no DB). */
@Injectable()
export class TemplatesService {
  list(): MarketplaceTemplate[] {
    return TEMPLATE_CATALOG;
  }

  getById(id: string): MarketplaceTemplate {
    const template = TEMPLATE_CATALOG.find((entry) => entry.id === id);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }
}

import { NotFoundException } from '@nestjs/common';
import { TemplatesService } from '../../src/templates/templates.service';

describe('TemplatesService', () => {
  const service = new TemplatesService();

  it('lists marketplace templates', () => {
    const templates = service.list();
    expect(templates.length).toBeGreaterThanOrEqual(2);
    expect(templates.some((template) => template.id === 'modern')).toBe(true);
  });

  it('reads a template by id', () => {
    expect(service.getById('basic').layout).toBe('basic');
  });

  it('rejects an unknown template', () => {
    expect(() => service.getById('missing')).toThrow(NotFoundException);
  });
});

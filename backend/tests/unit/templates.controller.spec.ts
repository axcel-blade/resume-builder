import { TemplatesController } from '../../src/templates/templates.controller';
import { TemplatesService } from '../../src/templates/templates.service';

describe('TemplatesController', () => {
  it('delegates list and getById', () => {
    const templatesService = {
      list: jest.fn().mockReturnValue([{ id: 'modern' }]),
      getById: jest.fn().mockReturnValue({ id: 'modern' }),
    };
    const controller = new TemplatesController(templatesService as unknown as TemplatesService);

    expect(controller.list()).toEqual([{ id: 'modern' }]);
    expect(controller.getById('modern')).toEqual({ id: 'modern' });
  });
});

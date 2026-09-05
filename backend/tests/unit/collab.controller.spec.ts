import { CollabController } from '../../src/collab/collab.controller';
import { CollabService } from '../../src/collab/collab.service';

describe('CollabController', () => {
  it('creates and joins rooms through the service', () => {
    const collabService = {
      createRoom: jest.fn().mockReturnValue({ roomId: 'room-1' }),
      join: jest.fn().mockReturnValue({ roomId: 'room-1', peers: 1 }),
      publish: jest.fn().mockReturnValue({ revision: 1, peers: 1 }),
      getRoom: jest.fn().mockReturnValue({ id: 'room-1', revision: 0, resume: null, peers: new Set() }),
    };
    const controller = new CollabController(collabService as unknown as CollabService);

    expect(controller.createRoom()).toEqual({ roomId: 'room-1' });
    expect(controller.join('room-1', { clientId: 'c1' })).toEqual({ roomId: 'room-1', peers: 1 });
    expect(controller.publish('room-1', { clientId: 'c1', resume: { a: 1 } })).toEqual({
      revision: 1,
      peers: 1,
    });
  });
});

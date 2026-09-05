import { NotFoundException } from '@nestjs/common';
import { CollabService } from '../../src/collab/collab.service';

describe('CollabService', () => {
  let service: CollabService;

  beforeEach(() => {
    service = new CollabService();
  });

  it('creates a room and publishes last-write-wins updates', () => {
    const { roomId } = service.createRoom();
    const events: string[] = [];
    service.subscribe(roomId, (event) => events.push(event.type));

    service.join(roomId, 'alice');
    const published = service.publish(roomId, 'alice', { profile: { fullName: 'Ada' } });

    expect(published.revision).toBe(1);
    expect(service.getRoom(roomId).resume).toEqual({ profile: { fullName: 'Ada' } });
    expect(events).toContain('update');
  });

  it('rejects unknown rooms', () => {
    expect(() => service.getRoom('missing')).toThrow(NotFoundException);
  });
});

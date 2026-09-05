import { Injectable, NotFoundException } from '@nestjs/common';

export type CollabListener = (event: CollabEvent) => void;

export interface CollabEvent {
  type: 'hello' | 'update' | 'peers';
  roomId: string;
  revision: number;
  resume?: unknown;
  clientId?: string;
  peers: number;
}

interface CollabRoom {
  id: string;
  resume: unknown;
  revision: number;
  peers: Set<string>;
  listeners: Set<CollabListener>;
}

@Injectable()
export class CollabService {
  /** roomId → room state; last-write-wins on publish. */
  private readonly rooms = new Map<string, CollabRoom>();

  createRoom(): { roomId: string } {
    const roomId = crypto.randomUUID();
    this.rooms.set(roomId, {
      id: roomId,
      resume: null,
      revision: 0,
      peers: new Set(),
      listeners: new Set(),
    });
    return { roomId };
  }

  getRoom(roomId: string): CollabRoom {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new NotFoundException('Collaboration room not found');
    }
    return room;
  }

  join(roomId: string, clientId: string) {
    const room = this.getRoom(roomId);
    room.peers.add(clientId);
    this.emit(room, { type: 'peers', roomId, revision: room.revision, peers: room.peers.size });
    return {
      roomId,
      revision: room.revision,
      resume: room.resume,
      peers: room.peers.size,
    };
  }

  leave(roomId: string, clientId: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    room.peers.delete(clientId);
    this.emit(room, { type: 'peers', roomId, revision: room.revision, peers: room.peers.size });
  }

  /**
   * Last-write-wins snapshot sync. Clients ignore events from their own clientId
   * so a slower peer does not overwrite a newer local edit.
   */
  publish(roomId: string, clientId: string, resume: unknown) {
    const room = this.getRoom(roomId);
    room.resume = resume;
    room.revision += 1;
    this.emit(room, {
      type: 'update',
      roomId,
      revision: room.revision,
      resume,
      clientId,
      peers: room.peers.size,
    });
    return { revision: room.revision, peers: room.peers.size };
  }

  subscribe(roomId: string, listener: CollabListener) {
    const room = this.getRoom(roomId);
    room.listeners.add(listener);
    listener({
      type: 'hello',
      roomId,
      revision: room.revision,
      resume: room.resume,
      peers: room.peers.size,
    });
    return () => {
      room.listeners.delete(listener);
    };
  }

  private emit(room: CollabRoom, event: CollabEvent) {
    for (const listener of room.listeners) {
      listener(event);
    }
  }
}

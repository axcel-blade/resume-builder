import { API_BASE_URL } from './config';
import { apiRequest } from './http';

/** sessionStorage key for a stable per-tab collab peer id */
const CLIENT_KEY = 'vita_forge_collab_client';

export function getCollabClientId(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }
  const existing = window.sessionStorage.getItem(CLIENT_KEY);
  if (existing) {
    return existing;
  }
  const next = crypto.randomUUID();
  window.sessionStorage.setItem(CLIENT_KEY, next);
  return next;
}

export function createCollabRoom(): Promise<{ roomId: string }> {
  return apiRequest('/collab/rooms', { method: 'POST' });
}

export function joinCollabRoom(roomId: string, clientId: string) {
  return apiRequest(`/collab/rooms/${roomId}/join`, {
    method: 'POST',
    body: { clientId },
  });
}

export function publishCollabState(roomId: string, clientId: string, resume: unknown) {
  return apiRequest(`/collab/rooms/${roomId}/state`, {
    method: 'POST',
    body: { clientId, resume },
  });
}

/** Subscribe to room SSE; return a disposer that closes the EventSource. */
export function openCollabStream(
  roomId: string,
  clientId: string,
  onEvent: (event: { type: string; resume?: unknown; clientId?: string; peers?: number }) => void,
): () => void {
  const source = new EventSource(
    `${API_BASE_URL}/collab/rooms/${encodeURIComponent(roomId)}/stream?clientId=${encodeURIComponent(clientId)}`,
  );
  source.onmessage = (message) => {
    try {
      onEvent(JSON.parse(message.data));
    } catch {
      // ignore malformed frames
    }
  };
  return () => source.close();
}

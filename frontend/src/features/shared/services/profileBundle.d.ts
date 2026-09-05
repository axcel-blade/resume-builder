export function enableRemoteProfileMode(enabled: boolean): void;
export function readProfileBundle(): {
  resume?: unknown;
  coverLetter?: unknown;
  [key: string]: unknown;
};
export function writeProfileBundle(patch: Record<string, unknown>): Record<string, unknown> | void;
export function buildProfileExport(input: {
  resume?: unknown;
  coverLetter?: unknown;
}): Record<string, unknown>;
export function normalizeImportedProfile(payload: unknown): {
  resume?: unknown;
  coverLetter?: unknown;
};

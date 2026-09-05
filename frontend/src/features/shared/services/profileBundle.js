/* src/apps/shared/services/profileBundle.js */

const STORAGE_KEY = "vita_forge_profile_bundle_v1";

let memoryCache = null;
// When true, signed-in sessions keep the bundle in memory and persist via the API.
let remoteMode = false;

function safeParse(rawValue) {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function enableRemoteProfileMode(enabled) {
  remoteMode = Boolean(enabled);
  if (!remoteMode) {
    memoryCache = null;
  }
}

export function readProfileBundle() {
  if (memoryCache) {
    return { ...memoryCache };
  }
  if (typeof window === "undefined" || remoteMode) {
    return {};
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  const parsed = safeParse(raw);
  return parsed && typeof parsed === "object" ? parsed : {};
}

export function writeProfileBundle(patch) {
  const current = readProfileBundle();
  const next = { ...current, ...patch };
  memoryCache = next;
  if (typeof window === "undefined" || remoteMode) {
    return next;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function buildProfileExport({ resume, coverLetter }) {
  const safeCoverLetter = coverLetter || {};
  const { applicationSource, referenceNumber, ...exportCoverLetter } = safeCoverLetter;

  return {
    version: "1.0.0",
    resume: resume || {},
    coverLetter: exportCoverLetter,
  };
}

export function normalizeImportedProfile(payload) {
  if (!payload || typeof payload !== "object") return {};
  if ("resume" in payload || "coverLetter" in payload) {
    return {
      resume: payload.resume || null,
      coverLetter: payload.coverLetter || null,
    };
  }
  return {
    resume: payload,
    coverLetter: null,
  };
}

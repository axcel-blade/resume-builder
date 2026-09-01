/* src/apps/shared/services/profileBundle.js */

const STORAGE_KEY = "vita_forge_profile_bundle_v1";

function safeParse(rawValue) {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function readProfileBundle() {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  const parsed = safeParse(raw);
  return parsed && typeof parsed === "object" ? parsed : {};
}

export function writeProfileBundle(patch) {
  if (typeof window === "undefined") return;
  const current = readProfileBundle();
  const next = { ...current, ...patch };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function buildProfileExport({ resume, coverLetter }) {
  const safeCoverLetter = coverLetter || {};
  const { applicationSource, referenceNumber, ...exportCoverLetter } = safeCoverLetter;

  return {
    version: "0.6.0",
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
  // Backward compatibility with old resume-only JSON exports.
  return {
    resume: payload,
    coverLetter: null,
  };
}

import { getProfile, uploadProfile } from './user';
import {
  enableRemoteProfileMode,
  readProfileBundle,
  writeProfileBundle,
} from '../features/shared/services/profileBundle';
import { formatErrorMessage } from './error-handling';

export async function pullRemoteProfile(): Promise<{
  resume?: unknown;
  coverLetter?: unknown;
  error?: string;
}> {
  try {
    const response = await getProfile();
    if (response.profile) {
      writeProfileBundle({
        resume: response.profile.resume,
        coverLetter: response.profile.coverLetter,
      });
      return { resume: response.profile.resume, coverLetter: response.profile.coverLetter };
    }
    return {};
  } catch (error) {
    return { error: formatErrorMessage(error) };
  }
}

export async function pushRemoteProfile(resume?: unknown, coverLetter?: unknown): Promise<{ error?: string }> {
  try {
    await uploadProfile({
      resume: resume as Record<string, unknown> | undefined,
      coverLetter: coverLetter as Record<string, unknown> | undefined,
    });
    return {};
  } catch (error) {
    return { error: formatErrorMessage(error) };
  }
}

export async function syncLocalBundleAfterAuth(): Promise<{ error?: string }> {
  const local = readProfileBundle();
  enableRemoteProfileMode(true);
  if (local.resume || local.coverLetter) {
    writeProfileBundle(local);
  }
  const remote = await pullRemoteProfile();
  if (remote.error) {
    return { error: remote.error };
  }
  if (!remote.resume && !remote.coverLetter && (local.resume || local.coverLetter)) {
    return pushRemoteProfile(local.resume, local.coverLetter);
  }
  return {};
}

export function readLocalResume() {
  return readProfileBundle().resume;
}

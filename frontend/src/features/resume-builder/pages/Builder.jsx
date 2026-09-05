/* src/apps/resume-builder/pages/Builder.jsx */

import React, { useEffect, useRef, useState } from "react";
import Toolbar from "../../../components/Toolbar";
import ResumeEditor from "../../../components/editors/ResumeEditor";
import A4PaginatedPreview from "../../../components/preview/A4PaginatedPreview";
import TemplateModern from "../../../components/TemplateModern";
import TemplateBasic from "../../../components/TemplateBasic";
import { defaultData } from "../../../constants/defaultData";
import { readProfileBundle, writeProfileBundle } from "../../shared/services/profileBundle";
import { useAuth } from "../../../services/auth-context";
import { pullRemoteProfile, pushRemoteProfile } from "../../../services/profile-sync";
import {
  createProfileVersion,
  listProfileVersions,
  restoreProfileVersion,
} from "../../../services/user";

export default function Builder() {
  const [data, setData] = useState(defaultData);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");
  const [versions, setVersions] = useState([]);
  const previewRef = useRef(null);
  const skipNextPush = useRef(true);
  const lastGoodRef = useRef(defaultData);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    const bundle = readProfileBundle();
    if (bundle.resume) {
      setData(bundle.resume);
      lastGoodRef.current = bundle.resume;
    }
  }, []);

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    let cancelled = false;
    setSyncing(true);
    setSyncError("");
    Promise.all([pullRemoteProfile(), listProfileVersions().catch(() => [])]).then(([result, nextVersions]) => {
      if (cancelled) {
        return;
      }
      if (result.resume) {
        skipNextPush.current = true;
        setData(result.resume);
        lastGoodRef.current = result.resume;
      }
      setVersions(nextVersions);
      if (result.error) {
        setSyncError(result.error);
      }
      setSyncing(false);
    });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    writeProfileBundle({ resume: data });
    if (!isAuthenticated) {
      return;
    }
    if (skipNextPush.current) {
      skipNextPush.current = false;
      return;
    }

    const snapshot = data;
    const timer = window.setTimeout(() => {
      setSyncing(true);
      pushRemoteProfile(snapshot, readProfileBundle().coverLetter).then((result) => {
        setSyncing(false);
        if (result.error) {
          setSyncError(result.error);
          skipNextPush.current = true;
          setData(lastGoodRef.current);
          writeProfileBundle({ resume: lastGoodRef.current });
          return;
        }
        lastGoodRef.current = snapshot;
        setSyncError("");
      });
    }, 800);

    return () => window.clearTimeout(timer);
  }, [data, isAuthenticated]);

  const refreshVersions = async () => {
    try {
      setVersions(await listProfileVersions());
    } catch {
      // keep existing list
    }
  };

  const saveRestorePoint = async () => {
    const result = await pushRemoteProfile(data, readProfileBundle().coverLetter);
    if (result.error) {
      setSyncError(result.error);
      return;
    }
    try {
      await createProfileVersion(`Restore point ${new Date().toLocaleString()}`);
      await refreshVersions();
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : "Could not save restore point");
    }
  };

  const restorePoint = async (versionId) => {
    if (!versionId) {
      return;
    }
    try {
      const restored = await restoreProfileVersion(versionId);
      if (restored.profile?.resume) {
        skipNextPush.current = true;
        setData(restored.profile.resume);
        lastGoodRef.current = restored.profile.resume;
        writeProfileBundle({
          resume: restored.profile.resume,
          coverLetter: restored.profile.coverLetter,
        });
      }
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : "Could not restore version");
    }
  };

  const getTemplateComponent = () => {
    const template = data.meta?.template || "modern";
    if (template === "basic") return TemplateBasic;
    return TemplateModern;
  };

  return (
    <section className="mx-auto max-w-[1700px] p-4">
      <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
      <p className="mt-2 max-w-3xl text-gray-600">
        Create a focused, professional resume by filling in your profile, experience, and skills with live
        A4 preview support.
      </p>
      {authLoading || syncing ? (
        <p className="mt-2 text-sm text-sky-700">Saving…</p>
      ) : isAuthenticated ? (
        <p className="mt-2 text-sm text-emerald-700">Saved to your account</p>
      ) : null}
      {syncError ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {syncError}
        </p>
      ) : null}
      {isAuthenticated ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm"
            onClick={saveRestorePoint}
          >
            Save restore point
          </button>
          <label className="text-sm text-gray-600">
            Version history
            <select
              className="ml-2 rounded-md border border-gray-300 bg-white px-2 py-1.5"
              defaultValue=""
              onChange={(event) => {
                void restorePoint(event.target.value);
                event.target.value = "";
              }}
            >
              <option value="">Restore…</option>
              {versions.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.label || version.createdAt}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}
      <Toolbar data={data} set={set} />
      <div className="mx-auto flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-sm font-semibold text-gray-700">Profile</p>
            </div>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-gray-100 p-4">
              <ResumeEditor data={data} set={set} />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-sm font-semibold text-gray-700">Resume Preview (A4 Pages)</p>
            </div>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-gray-100 p-4">
              <A4PaginatedPreview
                ref={previewRef}
                data={data}
                templateComponent={getTemplateComponent()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

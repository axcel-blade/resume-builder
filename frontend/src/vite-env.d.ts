/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_LM_STUDIO_API_URL?: string;
  readonly VITE_LM_STUDIO_MODEL_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

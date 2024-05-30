/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEWS_API_KEY: string;
  readonly VITE_NEWS_API_ORG_KEY: string;
  // Add more variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

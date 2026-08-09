/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Meta (Facebook) Pixel ID. Overrides the default baked into src/lib/pixel.ts. */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

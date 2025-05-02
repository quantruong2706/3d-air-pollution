/**
 * Type definitions for environment variables
 * This ensures type safety when accessing environment variables
 */

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_ENV: 'development' | 'staging' | 'production';
  readonly VITE_ENABLE_LOGGING: string;
  readonly VITE_MAP_PROVIDER: string;
  readonly VITE_DATA_SOURCE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

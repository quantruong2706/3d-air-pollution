/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

/**
 * Represents valid environment types
 */
export type EnvironmentType = 'development' | 'staging' | 'production';

/**
 * Environment configuration interface
 */
export interface EnvironmentConfig {
  readonly API_URL: string;
  readonly API_KEY: string;
  readonly ENV: EnvironmentType;
  readonly ENABLE_LOGGING: boolean;
  readonly MAP_PROVIDER: string;
  readonly DATA_SOURCE: string;
}

/**
 * Error thrown when an environment variable is missing
 */
class MissingEnvironmentVariableError extends Error {
  constructor(variableName: string) {
    super(`Missing environment variable: ${variableName}`);
    this.name = 'MissingEnvironmentVariableError';
  }
}

/**
 * Gets an environment variable or throws if it's not defined
 */
const getRequiredEnvVar = (name: string): string => {
  const value = import.meta.env[`VITE_${name}`];
  if (value === undefined) {
    throw new MissingEnvironmentVariableError(name);
  }
  return value;
};

/**
 * Gets an optional environment variable with fallback value
 */
const getOptionalEnvVar = (name: string, defaultValue: string): string => {
  const value = import.meta.env[`VITE_${name}`];
  return value === undefined ? defaultValue : value;
};

/**
 * Converts string value to boolean
 */
const parseBoolean = (value: string): boolean => {
  return value.toLowerCase() === 'true';
};

/**
 * Validates environment type
 */
const parseEnvironmentType = (value: string): EnvironmentType => {
  if (value === 'development' || value === 'staging' || value === 'production') {
    return value;
  }
  console.warn(`Invalid environment type: ${value}, falling back to development`);
  return 'development';
};

/**
 * Loads and validates all environment variables
 */
export const loadEnvironment = (): EnvironmentConfig => {
  try {
    return {
      API_URL: getRequiredEnvVar('API_URL'),
      API_KEY: getRequiredEnvVar('API_KEY'),
      ENV: parseEnvironmentType(getRequiredEnvVar('ENV')),
      ENABLE_LOGGING: parseBoolean(getOptionalEnvVar('ENABLE_LOGGING', 'false')),
      MAP_PROVIDER: getOptionalEnvVar('MAP_PROVIDER', 'default'),
      DATA_SOURCE: getOptionalEnvVar('DATA_SOURCE', 'local'),
    };
  } catch (error) {
    console.error('Failed to load environment variables:', error);
    throw error;
  }
};

/**
 * Singleton environment configuration instance
 */
export const env: Readonly<EnvironmentConfig> = loadEnvironment();

/**
 * Utility functions to check current environment
 */
export const isDevelopment = (): boolean => env.ENV === 'development';
export const isStaging = (): boolean => env.ENV === 'staging';
export const isProduction = (): boolean => env.ENV === 'production';

export default env;

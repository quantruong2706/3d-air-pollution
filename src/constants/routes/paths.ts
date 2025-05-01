/**
 * Application route paths
 * Centralized definition of all routes in the application
 */

export const ROUTES = {
  HOME: '/',
  AIR_POLLUTION_MAP: '/air-pollution-map',
  NOT_FOUND: '*',
} as const;

export type AppRoutes = (typeof ROUTES)[keyof typeof ROUTES];

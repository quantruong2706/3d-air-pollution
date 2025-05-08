/**
 * Constants defining view types for the factory map
 */

export const VIEW_TYPES = {
  TOP_DOWN: 'topDown',
  ISOMETRIC: 'isometric',
  SIDE: 'side',
  BIRD: 'bird',
} as const;

export type ViewType = (typeof VIEW_TYPES)[keyof typeof VIEW_TYPES];

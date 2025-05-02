export interface AQIThresholds {
  readonly good: number;
  readonly moderate: number;
  readonly unhealthySensitive: number;
  readonly unhealthy: number;
}

export interface AQICategory {
  readonly name: string;
  readonly threshold: number;
}

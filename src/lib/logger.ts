// Simple logger utility with different log levels
// Can be expanded or replaced with a more robust logging library if needed

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Define log level colors for console output
const LOG_LEVEL_COLORS = {
  debug: '#7C7C7C', // Gray
  info: '#2563EB', // Blue
  warn: '#F59E0B', // Orange
  error: '#DC2626', // Red
};

// Set minimum log level based on environment
// In production, we might want to filter out debug logs
const MIN_LOG_LEVEL: LogLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

// Map log levels to numeric values for comparison
const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private static shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_VALUES[level] >= LOG_LEVEL_VALUES[MIN_LOG_LEVEL];
  }

  private static formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    return `${prefix} ${message}`;
  }

  static debug(message: string, ...args: unknown[]): void {
    if (!this.shouldLog('debug')) return;

    console.debug(
      `%c${this.formatMessage('debug', message)}`,
      `color: ${LOG_LEVEL_COLORS.debug}`,
      ...args
    );
  }

  static info(message: string, ...args: unknown[]): void {
    if (!this.shouldLog('info')) return;

    console.info(
      `%c${this.formatMessage('info', message)}`,
      `color: ${LOG_LEVEL_COLORS.info}`,
      ...args
    );
  }

  static warn(message: string, ...args: unknown[]): void {
    if (!this.shouldLog('warn')) return;

    console.warn(
      `%c${this.formatMessage('warn', message)}`,
      `color: ${LOG_LEVEL_COLORS.warn}`,
      ...args
    );
  }

  static error(message: string, ...args: unknown[]): void {
    if (!this.shouldLog('error')) return;

    console.error(
      `%c${this.formatMessage('error', message)}`,
      `color: ${LOG_LEVEL_COLORS.error}`,
      ...args
    );
  }
}

export default Logger;

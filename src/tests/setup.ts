// Import jest-dom để thêm các matchers tùy chỉnh vào jest
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Chạy cleanup sau mỗi test để đảm bảo DOM không bị ảnh hưởng giữa các test
afterEach(() => {
  cleanup();
});

// Mock cho IntersectionObserver vì jsdom không hỗ trợ
class MockIntersectionObserver implements IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Store callback but don't actually use it in the mock
    this._callback = callback;
    if (options) {
      this.root = options.root instanceof Document ? null : options.root || null;
      this.rootMargin = options.rootMargin || '0px';
      this.thresholds = Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold || 0];
    }
  }

  private _callback: IntersectionObserverCallback;
  private _entries: IntersectionObserverEntry[] = [];

  takeRecords(): IntersectionObserverEntry[] {
    // Return a copy of stored entries and clear the internal array
    const records = [...this._entries];
    this._entries = [];
    return records;
  }

  // Helper method to simulate intersections
  simulateIntersection(entries: Partial<IntersectionObserverEntry>[]) {
    const mappedEntries = entries.map(entry => ({
      isIntersecting: false,
      intersectionRatio: 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      target: document.createElement('div'),
      time: Date.now(),
      ...entry,
    }));

    this._entries.push(...(mappedEntries as IntersectionObserverEntry[]));
    this._callback(mappedEntries as IntersectionObserverEntry[], this);
    return mappedEntries;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

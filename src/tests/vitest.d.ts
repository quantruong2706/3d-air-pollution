/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveClass(className: string): R;
  // Add other matchers if needed
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {
      toBeVisible(): unknown;
      toBeRequired(): unknown;
    }
    interface AsymmetricMatchersContaining extends CustomMatchers {
      toBePartiallyChecked(): unknown;
      toHaveAttribute(attr: string, value?: string): unknown;
    }
  }
}

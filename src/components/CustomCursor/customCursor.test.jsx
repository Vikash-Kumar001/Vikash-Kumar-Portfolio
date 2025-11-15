import { render, screen } from '@testing-library/react';
import CustomCursor from './CustomCursor';

// Mock useCursor hook
jest.mock('./useCursor', () => ({
  useCursor: () => ({
    x: 100,
    y: 200,
    isHovering: false,
    isMagnetic: false,
    variant: 'default',
  }),
}));

describe('CustomCursor', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders cursor elements', () => {
    render(<CustomCursor />);
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    expect(cursor).toBeInTheDocument();
    expect(dot).toBeInTheDocument();
  });

  it('hides cursor on touch devices', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      value: 1,
    });

    render(<CustomCursor />);
    // Cursor should be hidden on touch devices
    expect(document.body.style.cursor).toBe('auto');
  });
});


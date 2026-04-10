import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import StatusDot from '../StatusDot';

describe('StatusDot', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot testID="dot" />
    );
    expect(getByTestId('dot')).toBeTruthy();
  });

  it('uses success color for online status', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot status="online" testID="dot" />
    );
    const dot = getByTestId('dot');
    const flatStyle = Object.assign(
      {},
      ...([].concat(dot.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#16a34a'); // light theme success
  });

  it('uses muted color for offline status', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot status="offline" testID="dot" />
    );
    const dot = getByTestId('dot');
    const flatStyle = Object.assign(
      {},
      ...([].concat(dot.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#64748b'); // light theme muted
  });

  it('uses warning color for idle status', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot status="idle" testID="dot" />
    );
    const dot = getByTestId('dot');
    const flatStyle = Object.assign(
      {},
      ...([].concat(dot.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#d97706'); // light theme warning
  });

  it('applies sm size dimensions', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot status="online" size="sm" testID="dot" />
    );
    const dot = getByTestId('dot');
    const flatStyle = Object.assign(
      {},
      ...([].concat(dot.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.width).toBe(8);
    expect(flatStyle.height).toBe(8);
    expect(flatStyle.borderRadius).toBe(4);
  });

  it('applies lg size dimensions', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot status="online" size="lg" testID="dot" />
    );
    const dot = getByTestId('dot');
    const flatStyle = Object.assign(
      {},
      ...([].concat(dot.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.width).toBe(14);
    expect(flatStyle.height).toBe(14);
    expect(flatStyle.borderRadius).toBe(7);
  });

  it('defaults to offline status and md size', () => {
    const { getByTestId } = renderWithTheme(
      <StatusDot testID="dot" />
    );
    const dot = getByTestId('dot');
    const flatStyle = Object.assign(
      {},
      ...([].concat(dot.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#64748b'); // muted = offline
    expect(flatStyle.width).toBe(10); // md = 10
    expect(flatStyle.height).toBe(10);
  });
});

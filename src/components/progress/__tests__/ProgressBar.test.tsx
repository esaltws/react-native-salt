import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} testID="bar" />
    );
    expect(getByTestId('bar')).toBeTruthy();
  });

  it('applies primary color by default', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} testID="bar" />
    );
    const bar = getByTestId('bar');
    const flatStyle = Object.assign(
      {},
      ...([].concat(bar.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#e2e8f0'); // border color (track)
  });

  it('applies intent color to the fill bar', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} intent="success" testID="bar" />
    );
    const bar = getByTestId('bar');
    const fill = bar.children[0];
    const fillStyle = Object.assign(
      {},
      ...([].concat((fill as any).props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(fillStyle.backgroundColor).toBe('#16a34a'); // success color
  });

  it('uses sm height (spacing.xs = 4)', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} size="sm" testID="bar" />
    );
    const bar = getByTestId('bar');
    const flatStyle = Object.assign(
      {},
      ...([].concat(bar.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.height).toBe(4);
    expect(flatStyle.borderRadius).toBe(2);
  });

  it('uses md height (spacing.sm = 8) by default', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} testID="bar" />
    );
    const bar = getByTestId('bar');
    const flatStyle = Object.assign(
      {},
      ...([].concat(bar.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.height).toBe(8);
    expect(flatStyle.borderRadius).toBe(4);
  });

  it('uses lg height (spacing.md = 12)', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} size="lg" testID="bar" />
    );
    const bar = getByTestId('bar');
    const flatStyle = Object.assign(
      {},
      ...([].concat(bar.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.height).toBe(12);
    expect(flatStyle.borderRadius).toBe(6);
  });

  it('clamps progress to 0 when negative', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={-0.5} testID="bar" />
    );
    expect(getByTestId('bar')).toBeTruthy();
  });

  it('clamps progress to 1 when exceeding', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={2} testID="bar" />
    );
    expect(getByTestId('bar')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressBar progress={0.5} testID="bar" style={{ marginTop: 10 }} />
    );
    const bar = getByTestId('bar');
    const flatStyle = Object.assign(
      {},
      ...([].concat(bar.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.marginTop).toBe(10);
  });
});

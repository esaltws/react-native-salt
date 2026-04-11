import React from 'react';
import { renderWithTheme, renderWithDarkTheme } from '../../../__tests__/test-utils';
import Skeleton from '../Skeleton';

describe('Skeleton', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton testID="skel" />
    );
    expect(getByTestId('skel')).toBeTruthy();
  });

  it('defaults width to 100%', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.width).toBe('100%');
  });

  it('defaults height to fontSizes.sm (14)', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.height).toBe(14); // fontSizes.sm
  });

  it('accepts custom width and height', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton width={200} height={40} testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.width).toBe(200);
    expect(flatStyle.height).toBe(40);
  });

  it('defaults radius to radius.md (10)', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.borderRadius).toBe(10); // radius.md
  });

  it('accepts custom radius', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton radius={20} testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.borderRadius).toBe(20);
  });

  it('uses light mode background color', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('rgba(0,0,0,0.06)');
  });

  it('uses dark mode background color', () => {
    const { getByTestId } = renderWithDarkTheme(
      <Skeleton testID="skel" />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('rgba(255,255,255,0.08)');
  });

  it('applies custom style', () => {
    const { getByTestId } = renderWithTheme(
      <Skeleton testID="skel" style={{ marginTop: 8 }} />
    );
    const skel = getByTestId('skel');
    const flatStyle = Object.assign(
      {},
      ...([].concat(skel.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.marginTop).toBe(8);
  });
});

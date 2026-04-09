import React from 'react';
import Text from '../Text';
import { renderWithTheme } from '../../../__tests__/test-utils';

// At fontLevel 16, fontSizes are: xs:12, sm:14, md:16, lg:18, xl:20, xxl:24, 3xl:32
// LINE_HEIGHT_SCALE: tight=1.2, normal=1.5, relaxed=1.8

describe('Text', () => {
  it('renders text content', () => {
    const { getByText } = renderWithTheme(<Text>Hello world</Text>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('renders with default fontSize "md" which maps to fontSizes.md (16)', () => {
    const { getByText } = renderWithTheme(<Text>Default size</Text>);
    const element = getByText('Default size');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(16);
  });

  it('renders with fontSize "sm" which maps to fontSizes.sm (14)', () => {
    const { getByText } = renderWithTheme(<Text fontSize="sm">Small text</Text>);
    const element = getByText('Small text');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(14);
  });

  it('renders with fontSize "lg" which maps to fontSizes.lg (18)', () => {
    const { getByText } = renderWithTheme(<Text fontSize="lg">Large text</Text>);
    const element = getByText('Large text');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(18);
  });

  it('applies default fontWeight of 400', () => {
    const { getByText } = renderWithTheme(<Text>Weighted text</Text>);
    const element = getByText('Weighted text');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontWeight).toBe('400');
  });

  it('calculates lineHeight with "normal" scale (1.5) by default', () => {
    const { getByText } = renderWithTheme(<Text fontSize="md">Normal line</Text>);
    const element = getByText('Normal line');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    // md = 16, normal = 1.5, lineHeight = Math.round(16 * 1.5) = 24
    expect(flatStyle.lineHeight).toBe(24);
  });

  it('calculates lineHeight with "tight" scale (1.2)', () => {
    const { getByText } = renderWithTheme(
      <Text fontSize="md" lineHeight="tight">Tight line</Text>
    );
    const element = getByText('Tight line');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    // md = 16, tight = 1.2, lineHeight = Math.round(16 * 1.2) = 19
    expect(flatStyle.lineHeight).toBe(19);
  });

  it('calculates lineHeight with "relaxed" scale (1.8)', () => {
    const { getByText } = renderWithTheme(
      <Text fontSize="lg" lineHeight="relaxed">Relaxed line</Text>
    );
    const element = getByText('Relaxed line');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    // lg = 18, relaxed = 1.8, lineHeight = Math.round(18 * 1.8) = 32
    expect(flatStyle.lineHeight).toBe(32);
  });

  it('sets textAlign when align prop is provided', () => {
    const { getByText } = renderWithTheme(<Text align="center">Centered</Text>);
    const element = getByText('Centered');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('sets textAlign to "right"', () => {
    const { getByText } = renderWithTheme(<Text align="right">Right aligned</Text>);
    const element = getByText('Right aligned');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBe('right');
  });

  it('does not set textAlign when align is not provided', () => {
    const { getByText } = renderWithTheme(<Text>No align</Text>);
    const element = getByText('No align');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBeUndefined();
  });

  it('sets numberOfLines when lines prop is provided', () => {
    const { getByText } = renderWithTheme(<Text lines={2}>Truncated text</Text>);
    const element = getByText('Truncated text');
    expect(element.props.numberOfLines).toBe(2);
  });

  it('sets ellipsizeMode when truncate prop is provided', () => {
    const { getByText } = renderWithTheme(
      <Text lines={1} truncate="tail">Clipped</Text>
    );
    const element = getByText('Clipped');
    expect(element.props.numberOfLines).toBe(1);
    expect(element.props.ellipsizeMode).toBe('tail');
  });

  it('sets ellipsizeMode to "middle"', () => {
    const { getByText } = renderWithTheme(
      <Text lines={1} truncate="middle">Middle clip</Text>
    );
    const element = getByText('Middle clip');
    expect(element.props.ellipsizeMode).toBe('middle');
  });

  it('sets ellipsizeMode to "head"', () => {
    const { getByText } = renderWithTheme(
      <Text lines={1} truncate="head">Head clip</Text>
    );
    const element = getByText('Head clip');
    expect(element.props.ellipsizeMode).toBe('head');
  });

  it('applies underline decoration', () => {
    const { getByText } = renderWithTheme(<Text decoration="underline">Underlined</Text>);
    const element = getByText('Underlined');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('applies strikethrough decoration', () => {
    const { getByText } = renderWithTheme(
      <Text decoration="strikethrough">Struck</Text>
    );
    const element = getByText('Struck');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not set textDecorationLine when decoration is not provided', () => {
    const { getByText } = renderWithTheme(<Text>Plain text</Text>);
    const element = getByText('Plain text');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBeUndefined();
  });

  it('uses theme text color', () => {
    const { getByText } = renderWithTheme(<Text>Themed</Text>);
    const element = getByText('Themed');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    // light theme text color
    expect(flatStyle.color).toBe('#0f172a');
  });

  it('merges custom style prop', () => {
    const { getByText } = renderWithTheme(
      <Text style={{ marginTop: 10 }}>Styled</Text>
    );
    const element = getByText('Styled');
    // Style is an array: [internal styles, custom style]
    const styles = element.props.style;
    expect(Array.isArray(styles)).toBe(true);
    const flatStyle = Object.assign({}, ...styles);
    expect(flatStyle.marginTop).toBe(10);
  });
});

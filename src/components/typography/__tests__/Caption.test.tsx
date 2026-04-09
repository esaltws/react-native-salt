import React from 'react';
import Caption from '../Caption';
import { renderWithTheme, renderWithDarkTheme } from '../../../__tests__/test-utils';

// At fontLevel 16, fontSizes are: xs:12, sm:14, md:16, lg:18, xl:20, xxl:24, 3xl:32
// Caption sizeMap: sm->10, md->fontSizes.xs(12), lg->fontSizes.sm(14)

describe('Caption', () => {
  it('renders text content', () => {
    const { getByText } = renderWithTheme(<Caption>Caption text</Caption>);
    expect(getByText('Caption text')).toBeTruthy();
  });

  it('uses muted color from the light theme', () => {
    const { getByText } = renderWithTheme(<Caption>Muted caption</Caption>);
    const element = getByText('Muted caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    // light theme muted color
    expect(flatStyle.color).toBe('#64748b');
  });

  it('uses muted color from the dark theme', () => {
    const { getByText } = renderWithDarkTheme(<Caption>Dark muted</Caption>);
    const element = getByText('Dark muted');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    // dark theme muted color
    expect(flatStyle.color).toBe('#94a3b8');
  });

  it('renders with fontWeight 400', () => {
    const { getByText } = renderWithTheme(<Caption>Weight check</Caption>);
    const element = getByText('Weight check');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontWeight).toBe('400');
  });

  it('defaults to fontSize "md" which maps to fontSizes.xs (12)', () => {
    const { getByText } = renderWithTheme(<Caption>Default Caption</Caption>);
    const element = getByText('Default Caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(12);
  });

  it('maps fontSize "sm" to fixed value 10', () => {
    const { getByText } = renderWithTheme(
      <Caption fontSize="sm">Small Caption</Caption>
    );
    const element = getByText('Small Caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(10);
  });

  it('maps fontSize "lg" to fontSizes.sm (14)', () => {
    const { getByText } = renderWithTheme(
      <Caption fontSize="lg">Large Caption</Caption>
    );
    const element = getByText('Large Caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(14);
  });

  it('has smaller font sizes than the base Text component', () => {
    // Caption md = fontSizes.xs (12) vs Text md = fontSizes.md (16)
    const { getByText } = renderWithTheme(<Caption>Smaller</Caption>);
    const element = getByText('Smaller');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBeLessThan(16);
  });

  it('sets textAlign when align prop is provided', () => {
    const { getByText } = renderWithTheme(
      <Caption align="center">Centered Caption</Caption>
    );
    const element = getByText('Centered Caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('sets numberOfLines and ellipsizeMode', () => {
    const { getByText } = renderWithTheme(
      <Caption lines={2} truncate="tail">Truncated Caption</Caption>
    );
    const element = getByText('Truncated Caption');
    expect(element.props.numberOfLines).toBe(2);
    expect(element.props.ellipsizeMode).toBe('tail');
  });

  it('applies underline decoration', () => {
    const { getByText } = renderWithTheme(
      <Caption decoration="underline">Underlined Caption</Caption>
    );
    const element = getByText('Underlined Caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('applies strikethrough decoration', () => {
    const { getByText } = renderWithTheme(
      <Caption decoration="strikethrough">Struck Caption</Caption>
    );
    const element = getByText('Struck Caption');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not set textDecorationLine when decoration is not provided', () => {
    const { getByText } = renderWithTheme(<Caption>No decoration</Caption>);
    const element = getByText('No decoration');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBeUndefined();
  });

  it('merges custom style prop', () => {
    const { getByText } = renderWithTheme(
      <Caption style={{ opacity: 0.5 }}>Styled Caption</Caption>
    );
    const element = getByText('Styled Caption');
    const flatStyle = Object.assign({}, ...element.props.style);
    expect(flatStyle.opacity).toBe(0.5);
  });
});

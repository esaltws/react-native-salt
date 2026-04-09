import React from 'react';
import Title from '../Title';
import { renderWithTheme } from '../../../__tests__/test-utils';

// At fontLevel 16, fontSizes are: xs:12, sm:14, md:16, lg:18, xl:20, xxl:24, 3xl:32
// Title sizeMap: sm->fontSizes.lg(18), md->fontSizes.xl(20), lg->fontSizes.xxl(24)

describe('Title', () => {
  it('renders text content', () => {
    const { getByText } = renderWithTheme(<Title>My Title</Title>);
    expect(getByText('My Title')).toBeTruthy();
  });

  it('renders with fontWeight 600', () => {
    const { getByText } = renderWithTheme(<Title>Bold Title</Title>);
    const element = getByText('Bold Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontWeight).toBe('600');
  });

  it('has accessibilityRole set to "header"', () => {
    const { getByText } = renderWithTheme(<Title>Header Title</Title>);
    const element = getByText('Header Title');
    expect(element.props.accessibilityRole).toBe('header');
  });

  it('defaults to fontSize "md" which maps to fontSizes.xl (20)', () => {
    const { getByText } = renderWithTheme(<Title>Default Title</Title>);
    const element = getByText('Default Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(20);
  });

  it('maps fontSize "sm" to fontSizes.lg (18)', () => {
    const { getByText } = renderWithTheme(<Title fontSize="sm">Small Title</Title>);
    const element = getByText('Small Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(18);
  });

  it('maps fontSize "lg" to fontSizes.xxl (24)', () => {
    const { getByText } = renderWithTheme(<Title fontSize="lg">Large Title</Title>);
    const element = getByText('Large Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(24);
  });

  it('uses theme text color', () => {
    const { getByText } = renderWithTheme(<Title>Colored Title</Title>);
    const element = getByText('Colored Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.color).toBe('#0f172a');
  });

  it('sets textAlign when align prop is provided', () => {
    const { getByText } = renderWithTheme(<Title align="center">Centered Title</Title>);
    const element = getByText('Centered Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('sets numberOfLines and ellipsizeMode', () => {
    const { getByText } = renderWithTheme(
      <Title lines={1} truncate="tail">Truncated Title</Title>
    );
    const element = getByText('Truncated Title');
    expect(element.props.numberOfLines).toBe(1);
    expect(element.props.ellipsizeMode).toBe('tail');
  });

  it('applies underline decoration', () => {
    const { getByText } = renderWithTheme(
      <Title decoration="underline">Underlined Title</Title>
    );
    const element = getByText('Underlined Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('applies strikethrough decoration', () => {
    const { getByText } = renderWithTheme(
      <Title decoration="strikethrough">Struck Title</Title>
    );
    const element = getByText('Struck Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not set textDecorationLine when decoration is not provided', () => {
    const { getByText } = renderWithTheme(<Title>Plain Title</Title>);
    const element = getByText('Plain Title');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBeUndefined();
  });

  it('merges custom style prop', () => {
    const { getByText } = renderWithTheme(
      <Title style={{ marginBottom: 8 }}>Styled Title</Title>
    );
    const element = getByText('Styled Title');
    const styles = element.props.style;
    const flatStyle = Object.assign({}, ...styles);
    expect(flatStyle.marginBottom).toBe(8);
  });
});

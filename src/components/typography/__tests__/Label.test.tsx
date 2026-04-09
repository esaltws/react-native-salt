import React from 'react';
import Label from '../Label';
import { renderWithTheme } from '../../../__tests__/test-utils';

// At fontLevel 16, fontSizes are: xs:12, sm:14, md:16, lg:18, xl:20, xxl:24, 3xl:32
// Label sizeMap: sm->fontSizes.xs(12), md->fontSizes.sm(14), lg->fontSizes.md(16)

describe('Label', () => {
  it('renders text content', () => {
    const { getByText } = renderWithTheme(<Label>Label text</Label>);
    expect(getByText('Label text')).toBeTruthy();
  });

  it('renders with fontWeight 500', () => {
    const { getByText } = renderWithTheme(<Label>Medium Label</Label>);
    const element = getByText('Medium Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontWeight).toBe('500');
  });

  it('defaults to fontSize "md" which maps to fontSizes.sm (14)', () => {
    const { getByText } = renderWithTheme(<Label>Default Label</Label>);
    const element = getByText('Default Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(14);
  });

  it('maps fontSize "sm" to fontSizes.xs (12)', () => {
    const { getByText } = renderWithTheme(<Label fontSize="sm">Small Label</Label>);
    const element = getByText('Small Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(12);
  });

  it('maps fontSize "lg" to fontSizes.md (16)', () => {
    const { getByText } = renderWithTheme(<Label fontSize="lg">Large Label</Label>);
    const element = getByText('Large Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(16);
  });

  it('applies textTransform "uppercase" when uppercase prop is true', () => {
    const { getByText } = renderWithTheme(<Label uppercase>Uppercased</Label>);
    const element = getByText('Uppercased');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textTransform).toBe('uppercase');
  });

  it('does not set textTransform when uppercase prop is not provided', () => {
    const { getByText } = renderWithTheme(<Label>Normal case</Label>);
    const element = getByText('Normal case');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textTransform).toBeUndefined();
  });

  it('does not set textTransform when uppercase is false', () => {
    const { getByText } = renderWithTheme(<Label uppercase={false}>Lower</Label>);
    const element = getByText('Lower');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textTransform).toBeUndefined();
  });

  it('uses theme text color', () => {
    const { getByText } = renderWithTheme(<Label>Themed Label</Label>);
    const element = getByText('Themed Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.color).toBe('#0f172a');
  });

  it('sets textAlign when align prop is provided', () => {
    const { getByText } = renderWithTheme(
      <Label align="center">Centered Label</Label>
    );
    const element = getByText('Centered Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('sets numberOfLines and ellipsizeMode', () => {
    const { getByText } = renderWithTheme(
      <Label lines={1} truncate="tail">Truncated Label</Label>
    );
    const element = getByText('Truncated Label');
    expect(element.props.numberOfLines).toBe(1);
    expect(element.props.ellipsizeMode).toBe('tail');
  });

  it('applies underline decoration', () => {
    const { getByText } = renderWithTheme(
      <Label decoration="underline">Underlined Label</Label>
    );
    const element = getByText('Underlined Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('applies strikethrough decoration', () => {
    const { getByText } = renderWithTheme(
      <Label decoration="strikethrough">Struck Label</Label>
    );
    const element = getByText('Struck Label');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not set textDecorationLine when decoration is not provided', () => {
    const { getByText } = renderWithTheme(<Label>No decoration</Label>);
    const element = getByText('No decoration');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBeUndefined();
  });

  it('combines uppercase with other style props', () => {
    const { getByText } = renderWithTheme(
      <Label uppercase align="right" decoration="underline">Combo</Label>
    );
    const element = getByText('Combo');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textTransform).toBe('uppercase');
    expect(flatStyle.textAlign).toBe('right');
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('merges custom style prop', () => {
    const { getByText } = renderWithTheme(
      <Label style={{ paddingHorizontal: 4 }}>Styled Label</Label>
    );
    const element = getByText('Styled Label');
    const flatStyle = Object.assign({}, ...element.props.style);
    expect(flatStyle.paddingHorizontal).toBe(4);
  });
});

import React from 'react';
import Display from '../Display';
import { renderWithTheme } from '../../../__tests__/test-utils';

// At fontLevel 16, fontSizes are: xs:12, sm:14, md:16, lg:18, xl:20, xxl:24, 3xl:32
// Display sizeMap: sm->fontSizes.xxl(24), md->fontSizes["3xl"](32), lg->40

describe('Display', () => {
  it('renders text content', () => {
    const { getByText } = renderWithTheme(<Display>Big Text</Display>);
    expect(getByText('Big Text')).toBeTruthy();
  });

  it('renders with fontWeight 700', () => {
    const { getByText } = renderWithTheme(<Display>Bold Display</Display>);
    const element = getByText('Bold Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontWeight).toBe('700');
  });

  it('defaults to fontSize "md" which maps to fontSizes["3xl"] (32)', () => {
    const { getByText } = renderWithTheme(<Display>Default Display</Display>);
    const element = getByText('Default Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(32);
  });

  it('maps fontSize "sm" to fontSizes.xxl (24)', () => {
    const { getByText } = renderWithTheme(<Display fontSize="sm">Small Display</Display>);
    const element = getByText('Small Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(24);
  });

  it('maps fontSize "lg" to fixed value 40', () => {
    const { getByText } = renderWithTheme(<Display fontSize="lg">Large Display</Display>);
    const element = getByText('Large Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.fontSize).toBe(40);
  });

  it('uses the largest font sizes in the typography hierarchy', () => {
    const { getByText: getSm } = renderWithTheme(
      <Display fontSize="sm">Sm</Display>
    );
    const { getByText: getMd } = renderWithTheme(
      <Display fontSize="md">Md</Display>
    );
    const { getByText: getLg } = renderWithTheme(
      <Display fontSize="lg">Lg</Display>
    );

    const smStyle = Object.assign({}, ...getSm('Sm').props.style);
    const mdStyle = Object.assign({}, ...getMd('Md').props.style);
    const lgStyle = Object.assign({}, ...getLg('Lg').props.style);

    expect(smStyle.fontSize).toBeLessThan(mdStyle.fontSize);
    expect(mdStyle.fontSize).toBeLessThan(lgStyle.fontSize);
  });

  it('uses theme text color', () => {
    const { getByText } = renderWithTheme(<Display>Colored Display</Display>);
    const element = getByText('Colored Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.color).toBe('#0f172a');
  });

  it('sets textAlign when align prop is provided', () => {
    const { getByText } = renderWithTheme(
      <Display align="center">Centered Display</Display>
    );
    const element = getByText('Centered Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('sets numberOfLines and ellipsizeMode', () => {
    const { getByText } = renderWithTheme(
      <Display lines={1} truncate="tail">Truncated Display</Display>
    );
    const element = getByText('Truncated Display');
    expect(element.props.numberOfLines).toBe(1);
    expect(element.props.ellipsizeMode).toBe('tail');
  });

  it('applies underline decoration', () => {
    const { getByText } = renderWithTheme(
      <Display decoration="underline">Underlined Display</Display>
    );
    const element = getByText('Underlined Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('applies strikethrough decoration', () => {
    const { getByText } = renderWithTheme(
      <Display decoration="strikethrough">Struck Display</Display>
    );
    const element = getByText('Struck Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not set textDecorationLine when decoration is not provided', () => {
    const { getByText } = renderWithTheme(<Display>Plain Display</Display>);
    const element = getByText('Plain Display');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style)
      : element.props.style;
    expect(flatStyle.textDecorationLine).toBeUndefined();
  });

  it('merges custom style prop', () => {
    const { getByText } = renderWithTheme(
      <Display style={{ letterSpacing: 2 }}>Styled Display</Display>
    );
    const element = getByText('Styled Display');
    const flatStyle = Object.assign({}, ...element.props.style);
    expect(flatStyle.letterSpacing).toBe(2);
  });
});

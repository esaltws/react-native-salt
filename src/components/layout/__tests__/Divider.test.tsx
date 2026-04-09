import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Divider from '../Divider';

describe('Divider', () => {
  it('renders with theme border color by default', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.backgroundColor).toBe('#e2e8f0'); // theme.colors.border
  });

  it('renders horizontal divider with height: 1 by default', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.height).toBe(1);
    expect(flatStyle.alignSelf).toBe('stretch');
  });

  it('renders vertical divider with width: 1', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" vertical />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.width).toBe(1);
    expect(flatStyle.alignSelf).toBe('stretch');
  });

  it('applies custom thickness', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" thickness={3} />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.height).toBe(3);
  });

  it('applies custom color', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" color="#ff0000" />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.backgroundColor).toBe('#ff0000');
  });

  it('resolves inset spacing token', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" inset="lg" />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.marginLeft).toBe(16); // theme.spacing.lg
    expect(flatStyle.marginRight).toBe(16);
  });

  it('resolves margin spacing token', () => {
    const { getByTestId } = renderWithTheme(
      <Divider testID="divider" margin="sm" />
    );

    const divider = getByTestId('divider');
    const flatStyle = Array.isArray(divider.props.style)
      ? Object.assign({}, ...divider.props.style.filter(Boolean))
      : divider.props.style;
    expect(flatStyle.marginVertical).toBe(8); // theme.spacing.sm
  });
});

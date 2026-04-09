import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import ListSeparator from '../ListSeparator';

describe('ListSeparator', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <ListSeparator testID="list-separator" />
    );

    expect(getByTestId('list-separator')).toBeTruthy();
  });

  it('renders a Divider with default inset="lg" and margin="sm"', () => {
    const { getByTestId } = renderWithTheme(
      <ListSeparator testID="list-separator" />
    );

    const separator = getByTestId('list-separator');
    const flatStyle = Array.isArray(separator.props.style)
      ? Object.assign({}, ...separator.props.style.filter(Boolean))
      : separator.props.style;
    // inset="lg" resolves to 16 for marginLeft and marginRight
    expect(flatStyle.marginLeft).toBe(16);
    expect(flatStyle.marginRight).toBe(16);
    // margin="sm" resolves to 8 for marginVertical
    expect(flatStyle.marginVertical).toBe(8);
  });

  it('renders with theme border color', () => {
    const { getByTestId } = renderWithTheme(
      <ListSeparator testID="list-separator" />
    );

    const separator = getByTestId('list-separator');
    const flatStyle = Array.isArray(separator.props.style)
      ? Object.assign({}, ...separator.props.style.filter(Boolean))
      : separator.props.style;
    expect(flatStyle.backgroundColor).toBe('#e2e8f0'); // theme.colors.border
  });

  it('renders as horizontal divider (height: 1)', () => {
    const { getByTestId } = renderWithTheme(
      <ListSeparator testID="list-separator" />
    );

    const separator = getByTestId('list-separator');
    const flatStyle = Array.isArray(separator.props.style)
      ? Object.assign({}, ...separator.props.style.filter(Boolean))
      : separator.props.style;
    expect(flatStyle.height).toBe(1);
  });

  it('passes custom inset value', () => {
    const { getByTestId } = renderWithTheme(
      <ListSeparator testID="list-separator" inset="xl" />
    );

    const separator = getByTestId('list-separator');
    const flatStyle = Array.isArray(separator.props.style)
      ? Object.assign({}, ...separator.props.style.filter(Boolean))
      : separator.props.style;
    expect(flatStyle.marginLeft).toBe(24); // theme.spacing.xl
    expect(flatStyle.marginRight).toBe(24);
  });
});

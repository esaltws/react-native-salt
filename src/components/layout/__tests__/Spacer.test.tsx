import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Spacer from '../Spacer';

describe('Spacer', () => {
  it('renders with default size "md" as vertical spacer', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.height).toBe(12); // theme.spacing.md
  });

  it('renders with configurable spacing token size', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" size="xl" />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.height).toBe(24); // theme.spacing.xl
  });

  it('renders with configurable raw number size', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" size={40} />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.height).toBe(40);
  });

  it('renders horizontally when horizontal is true', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" size="lg" horizontal />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.width).toBe(16); // theme.spacing.lg
    expect(style.height).toBeUndefined();
  });

  it('renders as flex spacer when flex is true', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" flex />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.flex).toBe(1);
  });

  it('renders with custom flex value', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" flex={2} />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.flex).toBe(2);
  });

  it('renders "xs" token as 4px spacer', () => {
    const { getByTestId } = renderWithTheme(
      <Spacer testID="spacer" size="xs" />
    );

    const spacer = getByTestId('spacer');
    const style = spacer.props.style;
    expect(style.height).toBe(4); // theme.spacing.xs
  });
});

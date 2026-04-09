import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import PullIndicator from '../PullIndicator';

describe('PullIndicator', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" />
    );

    expect(getByTestId('pull-indicator')).toBeTruthy();
  });

  it('renders centered container', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" />
    );

    const indicator = getByTestId('pull-indicator');
    const flatStyle = Array.isArray(indicator.props.style)
      ? Object.assign({}, ...indicator.props.style.filter(Boolean))
      : indicator.props.style;
    expect(flatStyle.alignItems).toBe('center');
    expect(flatStyle.justifyContent).toBe('center');
  });

  it('renders inner bar with default dimensions', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" />
    );

    const indicator = getByTestId('pull-indicator');
    // The inner bar is the first child of the container
    const innerBar = (indicator.children as any[])[0];
    expect(innerBar.props.style.width).toBe(36);
    expect(innerBar.props.style.height).toBe(5);
    expect(innerBar.props.style.borderRadius).toBe(2.5); // height / 2
  });

  it('renders inner bar with theme border color by default', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" />
    );

    const indicator = getByTestId('pull-indicator');
    const innerBar = (indicator.children as any[])[0];
    expect(innerBar.props.style.backgroundColor).toBe('#e2e8f0'); // theme.colors.border
  });

  it('applies custom color', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" color="#ff0000" />
    );

    const indicator = getByTestId('pull-indicator');
    const innerBar = (indicator.children as any[])[0];
    expect(innerBar.props.style.backgroundColor).toBe('#ff0000');
  });

  it('applies custom width and height', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" width={50} height={8} />
    );

    const indicator = getByTestId('pull-indicator');
    const innerBar = (indicator.children as any[])[0];
    expect(innerBar.props.style.width).toBe(50);
    expect(innerBar.props.style.height).toBe(8);
    expect(innerBar.props.style.borderRadius).toBe(4); // height / 2
  });

  it('applies padding from theme spacing.sm', () => {
    const { getByTestId } = renderWithTheme(
      <PullIndicator testID="pull-indicator" />
    );

    const indicator = getByTestId('pull-indicator');
    const flatStyle = Array.isArray(indicator.props.style)
      ? Object.assign({}, ...indicator.props.style.filter(Boolean))
      : indicator.props.style;
    expect(flatStyle.paddingVertical).toBe(8); // theme.spacing.sm
  });
});

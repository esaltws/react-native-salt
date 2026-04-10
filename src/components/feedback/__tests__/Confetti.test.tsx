import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Confetti from '../Confetti';

describe('Confetti', () => {
  it('renders when active', () => {
    const { getByTestId } = renderWithTheme(
      <Confetti active testID="confetti" />
    );
    expect(getByTestId('confetti')).toBeTruthy();
  });

  it('returns null when not active', () => {
    const { queryByTestId } = renderWithTheme(
      <Confetti active={false} testID="confetti" />
    );
    expect(queryByTestId('confetti')).toBeNull();
  });

  it('renders specified count of particles', () => {
    const { getByTestId } = renderWithTheme(
      <Confetti active count={10} testID="confetti" />
    );
    const container = getByTestId('confetti');
    expect(container.children.length).toBe(10);
  });

  it('accepts custom colors', () => {
    const { getByTestId } = renderWithTheme(
      <Confetti active count={5} colors={['#FF0000', '#00FF00']} testID="confetti" />
    );
    expect(getByTestId('confetti')).toBeTruthy();
  });
});

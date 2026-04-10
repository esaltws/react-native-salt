import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import FontLevelSwitcher from '../FontLevelSwitcher';

describe('FontLevelSwitcher', () => {
  it('renders font level options', () => {
    const { getByText } = renderWithTheme(<FontLevelSwitcher />);
    // Should render chip items for the available font levels
    expect(getByText('16')).toBeTruthy();
    expect(getByText('14')).toBeTruthy();
    expect(getByText('12')).toBeTruthy();
  });

  it('renders all 11 font level options', () => {
    const { getByText } = renderWithTheme(<FontLevelSwitcher />);
    const levels = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8];
    levels.forEach((level) => {
      expect(getByText(String(level))).toBeTruthy();
    });
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <FontLevelSwitcher testID="font-switcher" />
    );
    expect(getByTestId('font-switcher')).toBeTruthy();
  });

  it('renders without crashing with default props', () => {
    const { toJSON } = renderWithTheme(<FontLevelSwitcher />);
    expect(toJSON()).toBeTruthy();
  });
});

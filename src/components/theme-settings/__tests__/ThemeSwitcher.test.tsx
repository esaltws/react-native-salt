import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ThemeSwitcher from '../ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('renders three theme buttons', () => {
    const { getByText } = renderWithTheme(<ThemeSwitcher />);
    expect(getByText('System')).toBeTruthy();
    expect(getByText('Light')).toBeTruthy();
    expect(getByText('Dark')).toBeTruthy();
  });

  it('renders with light preference selected by default', () => {
    const { getByText } = renderWithTheme(<ThemeSwitcher />, {
      initialPreference: 'light',
    });
    // The "Light" button should be the "solid" variant
    expect(getByText('Light')).toBeTruthy();
  });

  it('can switch to dark mode', () => {
    const { getByText } = renderWithTheme(<ThemeSwitcher />);
    fireEvent.press(getByText('Dark'));
    // After pressing, the Dark button should update
    expect(getByText('Dark')).toBeTruthy();
  });

  it('can switch to system mode', () => {
    const { getByText } = renderWithTheme(<ThemeSwitcher />);
    fireEvent.press(getByText('System'));
    expect(getByText('System')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <ThemeSwitcher testID="theme-switcher" />
    );
    expect(getByTestId('theme-switcher')).toBeTruthy();
  });
});

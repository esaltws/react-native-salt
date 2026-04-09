import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { SaltProvider } from '../theme/ThemeContext';
import { ThemePreference, FontLevel } from '../types';

type ThemeWrapperOptions = {
  initialPreference?: ThemePreference;
  fontLevel?: FontLevel;
};

function createWrapper(options: ThemeWrapperOptions = {}) {
  const { initialPreference = 'light', fontLevel = 16 } = options;
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SaltProvider initialPreference={initialPreference} fontLevel={fontLevel}>
        {children}
      </SaltProvider>
    );
  };
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & ThemeWrapperOptions
) {
  const { initialPreference, fontLevel, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ initialPreference, fontLevel }),
    ...renderOptions,
  });
}

export function renderWithDarkTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: createWrapper({ initialPreference: 'dark' }),
    ...options,
  });
}

export { render, fireEvent, waitFor, act, screen } from '@testing-library/react-native';

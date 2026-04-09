import React from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent, waitFor, act } from '../../__tests__/test-utils';
import { SaltProvider, useTheme } from '../ThemeContext';

// Helper component that exposes theme context values for testing
function ThemeConsumer({ onTheme }: { onTheme?: (ctx: ReturnType<typeof useTheme>) => void }) {
  const ctx = useTheme();
  if (onTheme) onTheme(ctx);
  return (
    <>
      <Text testID="mode">{ctx.mode}</Text>
      <Text testID="preference">{ctx.preference}</Text>
      <Text testID="fontLevel">{String(ctx.fontLevel)}</Text>
      <Text testID="isThemeLoaded">{String(ctx.isThemeLoaded)}</Text>
    </>
  );
}

function ToggleConsumer() {
  const { mode, preference, toggleTheme } = useTheme();
  return (
    <>
      <Text testID="mode">{mode}</Text>
      <Text testID="preference">{preference}</Text>
      <Button testID="toggle" title="toggle" onPress={toggleTheme} />
    </>
  );
}

describe('SaltProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <SaltProvider>
        <Text>Hello Salt</Text>
      </SaltProvider>
    );
    expect(getByText('Hello Salt')).toBeTruthy();
  });

  it('provides default preference of "system"', async () => {
    const { getByTestId } = render(
      <SaltProvider>
        <ThemeConsumer />
      </SaltProvider>
    );

    // Before AsyncStorage loads, preference defaults to initialPreference which is "system"
    expect(getByTestId('preference').props.children).toBe('system');
  });

  it('provides default fontLevel of 16', () => {
    const { getByTestId } = render(
      <SaltProvider>
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('16');
  });

  it('accepts fontLevel preset string "xs" (resolves to 14)', () => {
    const { getByTestId } = render(
      <SaltProvider fontLevel="xs">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('14');
  });

  it('accepts fontLevel preset string "sm" (resolves to 15)', () => {
    const { getByTestId } = render(
      <SaltProvider fontLevel="sm">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('15');
  });

  it('accepts fontLevel preset string "md" (resolves to 16)', () => {
    const { getByTestId } = render(
      <SaltProvider fontLevel="md">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('16');
  });

  it('accepts fontLevel preset string "lg" (resolves to 17)', () => {
    const { getByTestId } = render(
      <SaltProvider fontLevel="lg">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('17');
  });

  it('accepts fontLevel preset string "xl" (resolves to 18)', () => {
    const { getByTestId } = render(
      <SaltProvider fontLevel="xl">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('18');
  });

  it('accepts numeric fontLevel directly', () => {
    const { getByTestId } = render(
      <SaltProvider fontLevel={12}>
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('fontLevel').props.children).toBe('12');
  });

  it('uses light mode when initialPreference is "light"', () => {
    const { getByTestId } = render(
      <SaltProvider initialPreference="light">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('mode').props.children).toBe('light');
  });

  it('uses dark mode when initialPreference is "dark"', () => {
    const { getByTestId } = render(
      <SaltProvider initialPreference="dark">
        <ThemeConsumer />
      </SaltProvider>
    );
    expect(getByTestId('mode').props.children).toBe('dark');
  });

  it('toggleTheme switches from light to dark', async () => {
    const { getByTestId } = render(
      <SaltProvider initialPreference="light">
        <ToggleConsumer />
      </SaltProvider>
    );

    expect(getByTestId('mode').props.children).toBe('light');

    await act(async () => {
      fireEvent.press(getByTestId('toggle'));
    });

    expect(getByTestId('mode').props.children).toBe('dark');
  });

  it('toggleTheme switches from dark to light', async () => {
    const { getByTestId } = render(
      <SaltProvider initialPreference="dark">
        <ToggleConsumer />
      </SaltProvider>
    );

    expect(getByTestId('mode').props.children).toBe('dark');

    await act(async () => {
      fireEvent.press(getByTestId('toggle'));
    });

    expect(getByTestId('mode').props.children).toBe('light');
  });

  it('isThemeLoaded becomes true after mount', async () => {
    const { getByTestId } = render(
      <SaltProvider>
        <ThemeConsumer />
      </SaltProvider>
    );

    await waitFor(() => {
      expect(getByTestId('isThemeLoaded').props.children).toBe('true');
    });
  });
});

describe('useTheme', () => {
  it('throws when used outside of SaltProvider', () => {
    // Suppress console.error output for the expected error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    function Orphan() {
      useTheme();
      return null;
    }

    expect(() => render(<Orphan />)).toThrow('useTheme must be used inside SaltProvider');

    consoleSpy.mockRestore();
  });
});

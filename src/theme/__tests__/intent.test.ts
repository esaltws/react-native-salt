import { resolveIntentColor, resolveOnIntentColor } from '../intent';
import { lightTheme } from '../lightTheme';
import { darkTheme } from '../darkTheme';
import type { Intent } from '../../types';

describe('resolveIntentColor', () => {
  const lightColors = lightTheme.colors;

  it('returns the primary color for "primary" intent', () => {
    expect(resolveIntentColor(lightColors, 'primary')).toBe('#2563eb');
  });

  it('returns the secondary color for "secondary" intent', () => {
    expect(resolveIntentColor(lightColors, 'secondary')).toBe('#7c3aed');
  });

  it('returns the danger color for "danger" intent', () => {
    expect(resolveIntentColor(lightColors, 'danger')).toBe('#dc2626');
  });

  it('returns the success color for "success" intent', () => {
    expect(resolveIntentColor(lightColors, 'success')).toBe('#16a34a');
  });

  it('returns the warning color for "warning" intent', () => {
    expect(resolveIntentColor(lightColors, 'warning')).toBe('#d97706');
  });

  it('returns the info color for "info" intent', () => {
    expect(resolveIntentColor(lightColors, 'info')).toBe('#0ea5e9');
  });

  it('returns correct colors for dark theme', () => {
    const darkColors = darkTheme.colors;
    expect(resolveIntentColor(darkColors, 'primary')).toBe('#60a5fa');
    expect(resolveIntentColor(darkColors, 'danger')).toBe('#f87171');
    expect(resolveIntentColor(darkColors, 'success')).toBe('#4ade80');
    expect(resolveIntentColor(darkColors, 'warning')).toBe('#fbbf24');
    expect(resolveIntentColor(darkColors, 'info')).toBe('#38bdf8');
    expect(resolveIntentColor(darkColors, 'secondary')).toBe('#a78bfa');
  });
});

describe('resolveOnIntentColor', () => {
  const lightColors = lightTheme.colors;

  it('returns the onPrimary color for "primary" intent', () => {
    expect(resolveOnIntentColor(lightColors, 'primary')).toBe('#ffffff');
  });

  it('returns the onSecondary color for "secondary" intent', () => {
    expect(resolveOnIntentColor(lightColors, 'secondary')).toBe('#ffffff');
  });

  it('returns the onDanger color for "danger" intent', () => {
    expect(resolveOnIntentColor(lightColors, 'danger')).toBe('#ffffff');
  });

  it('returns the onSuccess color for "success" intent', () => {
    expect(resolveOnIntentColor(lightColors, 'success')).toBe('#ffffff');
  });

  it('returns the onWarning color for "warning" intent', () => {
    expect(resolveOnIntentColor(lightColors, 'warning')).toBe('#ffffff');
  });

  it('returns the onInfo color for "info" intent', () => {
    expect(resolveOnIntentColor(lightColors, 'info')).toBe('#ffffff');
  });

  it('returns correct on-colors for dark theme', () => {
    const darkColors = darkTheme.colors;
    const intents: Intent[] = ['primary', 'secondary', 'danger', 'success', 'warning', 'info'];
    intents.forEach((intent) => {
      expect(resolveOnIntentColor(darkColors, intent)).toBe('#0f172a');
    });
  });
});

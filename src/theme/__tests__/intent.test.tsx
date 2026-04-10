import { resolveIntentColor, resolveOnIntentColor } from '../../intent';
import { lightTheme } from '../../lightTheme';

const colors = lightTheme.colors;

describe('resolveIntentColor', () => {
  it('returns correct color for each intent', () => {
    expect(resolveIntentColor(colors, 'primary')).toBe(colors.primary);
    expect(resolveIntentColor(colors, 'secondary')).toBe(colors.secondary);
    expect(resolveIntentColor(colors, 'danger')).toBe(colors.danger);
    expect(resolveIntentColor(colors, 'success')).toBe(colors.success);
    expect(resolveIntentColor(colors, 'warning')).toBe(colors.warning);
    expect(resolveIntentColor(colors, 'info')).toBe(colors.info);
  });
});

describe('resolveOnIntentColor', () => {
  it('returns correct onColor for each intent', () => {
    expect(resolveOnIntentColor(colors, 'primary')).toBe(colors.onPrimary);
    expect(resolveOnIntentColor(colors, 'secondary')).toBe(colors.onSecondary);
    expect(resolveOnIntentColor(colors, 'danger')).toBe(colors.onDanger);
    expect(resolveOnIntentColor(colors, 'success')).toBe(colors.onSuccess);
    expect(resolveOnIntentColor(colors, 'warning')).toBe(colors.onWarning);
    expect(resolveOnIntentColor(colors, 'info')).toBe(colors.onInfo);
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Button from '../Button';

describe('Button', () => {
  // ── Render title text ──────────────────────────────────────────────
  it('renders the title text', () => {
    const { getByText } = renderWithTheme(<Button title="Submit" />);
    expect(getByText('Submit')).toBeTruthy();
  });

  // ── Variant styles ────────────────────────────────────────────────
  describe('variant styles', () => {
    it('solid variant has backgroundColor set to intent color', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Solid" variant="solid" intent="primary" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('#2563eb'); // light theme primary
    });

    it('outline variant has transparent background and border', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Outline" variant="outline" intent="primary" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('transparent');
      expect(flatStyle.borderWidth).toBe(1);
      expect(flatStyle.borderColor).toBe('#2563eb');
    });

    it('ghost variant has transparent background', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Ghost" variant="ghost" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('transparent');
    });

    it('text variant has transparent background and zero padding', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Text" variant="text" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('transparent');
      expect(flatStyle.paddingHorizontal).toBe(0);
      expect(flatStyle.paddingVertical).toBe(0);
    });

    it('link variant has transparent background and underlined text', () => {
      const { getByTestId, getByText } = renderWithTheme(
        <Button title="Link" variant="link" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('transparent');

      const label = getByText('Link');
      const textStyle = Object.assign({}, ...([].concat(label.props.style).flat(Infinity).filter(Boolean)));
      expect(textStyle.textDecorationLine).toBe('underline');
    });
  });

  // ── Intent maps to correct colors ────────────────────────────────
  describe('intent colors', () => {
    const intents: Array<{ intent: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'; color: string }> = [
      { intent: 'primary', color: '#2563eb' },
      { intent: 'secondary', color: '#7c3aed' },
      { intent: 'danger', color: '#dc2626' },
      { intent: 'success', color: '#16a34a' },
      { intent: 'warning', color: '#d97706' },
      { intent: 'info', color: '#0ea5e9' },
    ];

    intents.forEach(({ intent, color }) => {
      it(`solid variant with intent="${intent}" uses background ${color}`, () => {
        const { getByTestId } = renderWithTheme(
          <Button title="Btn" variant="solid" intent={intent} testID="btn" />
        );
        const btn = getByTestId('btn');
        const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
        expect(flatStyle.backgroundColor).toBe(color);
      });

      it(`outline variant with intent="${intent}" uses border color ${color}`, () => {
        const { getByTestId } = renderWithTheme(
          <Button title="Btn" variant="outline" intent={intent} testID="btn" />
        );
        const btn = getByTestId('btn');
        const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
        expect(flatStyle.borderColor).toBe(color);
      });
    });
  });

  // ── Disabled state ────────────────────────────────────────────────
  describe('disabled state', () => {
    it('reduces opacity to 0.6', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Disabled" disabled testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.opacity).toBe(0.6);
    });

    it('changes solid background to muted color', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Disabled" variant="solid" disabled testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('#64748b'); // light muted
    });

    it('prevents onPress from firing', () => {
      const onPress = jest.fn();
      const { getByTestId } = renderWithTheme(
        <Button title="Disabled" disabled onPress={onPress} testID="btn" />
      );
      fireEvent.press(getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('sets accessibilityState.disabled to true', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Disabled" disabled testID="btn" />
      );
      expect(getByTestId('btn').props.accessibilityState.disabled).toBe(true);
    });
  });

  // ── Loading state ─────────────────────────────────────────────────
  describe('loading state', () => {
    it('shows ActivityIndicator when loading', () => {
      const { UNSAFE_getByType } = renderWithTheme(
        <Button title="Loading" loading testID="btn" />
      );
      const { ActivityIndicator } = require('react-native');
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('does not show title text when loading', () => {
      const { queryByText } = renderWithTheme(
        <Button title="Loading" loading testID="btn" />
      );
      expect(queryByText('Loading')).toBeNull();
    });

    it('disables interaction when loading', () => {
      const onPress = jest.fn();
      const { getByTestId } = renderWithTheme(
        <Button title="Loading" loading onPress={onPress} testID="btn" />
      );
      fireEvent.press(getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('sets accessibilityState.busy to true', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Loading" loading testID="btn" />
      );
      expect(getByTestId('btn').props.accessibilityState.busy).toBe(true);
    });

    it('sets accessibilityState.disabled to true when loading', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Loading" loading testID="btn" />
      );
      expect(getByTestId('btn').props.accessibilityState.disabled).toBe(true);
    });
  });

  // ── Icon-only mode ────────────────────────────────────────────────
  describe('icon-only mode', () => {
    it('renders icon without title as icon-only', () => {
      const { getByText, queryByText, getByTestId } = renderWithTheme(
        <Button icon="add" testID="btn" />
      );
      // The icon renders (mocked Ionicons renders icon name as text)
      expect(getByText('add')).toBeTruthy();
      // No separate title text is rendered
      expect(queryByText('Submit')).toBeNull();
      expect(getByTestId('btn')).toBeTruthy();
    });

    it('uses padding instead of paddingVertical/paddingHorizontal for icon-only', () => {
      const { getByTestId } = renderWithTheme(
        <Button icon="add" size="md" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      // icon-only md uses { padding: spacing.md } = 12
      expect(flatStyle.padding).toBe(12);
    });
  });

  // ── iconLeft / iconRight alongside title ──────────────────────────
  describe('iconLeft and iconRight', () => {
    it('renders icon to the left of the title', () => {
      const { getByText } = renderWithTheme(
        <Button title="Save" iconLeft="save" testID="btn" />
      );
      // The icon renders via the mocked Ionicons as a Text with the resolved name
      // The Icon component maps 'save' -> 'save-outline' through ICON_MAP
      expect(getByText('Save')).toBeTruthy();
      expect(getByText('save-outline')).toBeTruthy();
    });

    it('renders icon to the right of the title', () => {
      const { getByText } = renderWithTheme(
        <Button title="Next" iconRight="chevron-right" testID="btn" />
      );
      expect(getByText('Next')).toBeTruthy();
      expect(getByText('chevron-forward')).toBeTruthy();
    });

    it('renders both iconLeft and iconRight', () => {
      const { getByText } = renderWithTheme(
        <Button title="Both" iconLeft="back" iconRight="chevron-right" testID="btn" />
      );
      expect(getByText('Both')).toBeTruthy();
      expect(getByText('arrow-back')).toBeTruthy();
      expect(getByText('chevron-forward')).toBeTruthy();
    });
  });

  // ── Size variants ─────────────────────────────────────────────────
  describe('size variants', () => {
    it('sm size applies smaller padding', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Small" size="sm" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      // spacing.sm = 8, spacing.md = 12
      expect(flatStyle.paddingVertical).toBe(8);
      expect(flatStyle.paddingHorizontal).toBe(12);
    });

    it('md size applies medium padding', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Medium" size="md" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      // spacing.md = 12, spacing.lg = 16
      expect(flatStyle.paddingVertical).toBe(12);
      expect(flatStyle.paddingHorizontal).toBe(16);
    });

    it('lg size applies larger padding', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Large" size="lg" testID="btn" />
      );
      const btn = getByTestId('btn');
      const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
      // spacing.lg = 16, spacing.xl = 24
      expect(flatStyle.paddingVertical).toBe(16);
      expect(flatStyle.paddingHorizontal).toBe(24);
    });
  });

  // ── fullWidth ─────────────────────────────────────────────────────
  it('fullWidth applies width 100%', () => {
    const { getByTestId } = renderWithTheme(
      <Button title="Full" fullWidth testID="btn" />
    );
    const btn = getByTestId('btn');
    const flatStyle = Object.assign({}, ...([].concat(btn.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.width).toBe('100%');
  });

  // ── onPress fires correctly ───────────────────────────────────────
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Button title="Press me" onPress={onPress} testID="btn" />
    );
    fireEvent.press(getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // ── Accessibility role ────────────────────────────────────────────
  it('has accessibilityRole button', () => {
    const { getByTestId } = renderWithTheme(
      <Button title="A11y" testID="btn" />
    );
    expect(getByTestId('btn').props.accessibilityRole).toBe('button');
  });

  // ── Edge: loading + disabled both disable, no onPress handler ─────
  describe('edge: loading + disabled combined', () => {
    it('both loading and disabled prevent onPress', () => {
      const onPress = jest.fn();
      const { getByTestId } = renderWithTheme(
        <Button title="Edge" loading disabled onPress={onPress} testID="btn" />
      );
      fireEvent.press(getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('accessibilityState reflects both disabled and busy', () => {
      const { getByTestId } = renderWithTheme(
        <Button title="Edge" loading disabled testID="btn" />
      );
      const state = getByTestId('btn').props.accessibilityState;
      expect(state.disabled).toBe(true);
      expect(state.busy).toBe(true);
    });

    it('works without an onPress handler at all', () => {
      expect(() => {
        renderWithTheme(<Button title="No handler" loading disabled testID="btn" />);
      }).not.toThrow();
    });
  });
});

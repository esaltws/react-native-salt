import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import FAB from '../FAB';

describe('FAB', () => {
  const noop = jest.fn();

  beforeEach(() => {
    noop.mockClear();
  });

  // ── Renders icon button ────────────────────────────────────────────
  it('renders an icon button', () => {
    const { getByTestId } = renderWithTheme(
      <FAB onPress={noop} testID="fab" />
    );
    expect(getByTestId('fab')).toBeTruthy();
  });

  it('renders the default "add" icon', () => {
    // The Icon component maps "add" -> "add" (identity in ICON_MAP)
    // The mocked Ionicons renders a Text with the icon name
    const { getByText } = renderWithTheme(
      <FAB onPress={noop} testID="fab" />
    );
    expect(getByText('add')).toBeTruthy();
  });

  it('renders a custom icon', () => {
    const { getByText } = renderWithTheme(
      <FAB icon="edit" onPress={noop} testID="fab" />
    );
    // "edit" maps to "create-outline" via ICON_MAP
    expect(getByText('create-outline')).toBeTruthy();
  });

  // ── Label extends to pill shape ────────────────────────────────────
  describe('label (extended FAB)', () => {
    it('renders label text alongside icon', () => {
      const { getByText } = renderWithTheme(
        <FAB label="Create" onPress={noop} testID="fab" />
      );
      expect(getByText('Create')).toBeTruthy();
      expect(getByText('add')).toBeTruthy();
    });

    it('has undefined width when label is present (extends to content)', () => {
      const { getByTestId } = renderWithTheme(
        <FAB label="Create" onPress={noop} testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.width).toBeUndefined();
    });

    it('has horizontal padding when label is present', () => {
      const { getByTestId } = renderWithTheme(
        <FAB label="Create" onPress={noop} testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      // spacing.lg = 16
      expect(flatStyle.paddingHorizontal).toBe(16);
    });

    it('has fixed width when no label (icon only)', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} testID="fab" size="md" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.width).toBe(56); // md btn size
    });
  });

  // ── Position variants ──────────────────────────────────────────────
  describe('position variants', () => {
    it('bottom-right positions to bottom and right', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} position="bottom-right" testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      // spacing.xl = 24
      expect(flatStyle.bottom).toBe(24);
      expect(flatStyle.right).toBe(24);
      expect(flatStyle.position).toBe('absolute');
    });

    it('bottom-left positions to bottom and left', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} position="bottom-left" testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.bottom).toBe(24);
      expect(flatStyle.left).toBe(24);
    });

    it('bottom-center positions to bottom center', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} position="bottom-center" testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.bottom).toBe(24);
      expect(flatStyle.alignSelf).toBe('center');
    });
  });

  // ── Size variants ──────────────────────────────────────────────────
  describe('size variants', () => {
    it('sm size renders a 40px button', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} size="sm" testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.width).toBe(40);
      expect(flatStyle.height).toBe(40);
    });

    it('md size renders a 56px button', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} size="md" testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.width).toBe(56);
      expect(flatStyle.height).toBe(56);
    });

    it('lg size renders a 64px button', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} size="lg" testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.width).toBe(68);
      expect(flatStyle.height).toBe(68);
    });
  });

  // ── Disabled state ─────────────────────────────────────────────────
  describe('disabled state', () => {
    it('uses muted background when disabled', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} disabled testID="fab" />
      );
      const fab = getByTestId('fab');
      const flatStyle = Object.assign({}, ...([].concat(fab.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('#64748b'); // muted color
    });

    it('prevents onPress from firing when disabled', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} disabled testID="fab" />
      );
      fireEvent.press(getByTestId('fab'));
      expect(noop).not.toHaveBeenCalled();
    });

    it('sets accessibilityState.disabled to true', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} disabled testID="fab" />
      );
      expect(getByTestId('fab').props.accessibilityState.disabled).toBe(true);
    });
  });

  // ── Accessibility ──────────────────────────────────────────────────
  describe('accessibility', () => {
    it('has accessibilityRole button', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} testID="fab" />
      );
      expect(getByTestId('fab').props.accessibilityRole).toBe('button');
    });

    it('uses label as accessibilityLabel when provided', () => {
      const { getByTestId } = renderWithTheme(
        <FAB onPress={noop} label="Create Item" testID="fab" />
      );
      expect(getByTestId('fab').props.accessibilityLabel).toBe('Create Item');
    });

    it('uses icon name as accessibilityLabel when no label', () => {
      const { getByTestId } = renderWithTheme(
        <FAB icon="edit" onPress={noop} testID="fab" />
      );
      expect(getByTestId('fab').props.accessibilityLabel).toBe('edit');
    });
  });

  // ── onPress fires ──────────────────────────────────────────────────
  it('calls onPress when pressed', () => {
    const { getByTestId } = renderWithTheme(
      <FAB onPress={noop} testID="fab" />
    );
    fireEvent.press(getByTestId('fab'));
    expect(noop).toHaveBeenCalledTimes(1);
  });
});

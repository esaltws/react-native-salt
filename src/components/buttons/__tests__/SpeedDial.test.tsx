import React from 'react';
import { renderWithTheme, fireEvent, act } from '../../../__tests__/test-utils';
import SpeedDial from '../SpeedDial';

describe('SpeedDial', () => {
  const actions = [
    { key: 'edit', icon: 'edit', label: 'Edit', onPress: jest.fn() },
    { key: 'share', icon: 'share-outline', label: 'Share', onPress: jest.fn() },
    { key: 'delete', icon: 'close', label: 'Delete', onPress: jest.fn() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Main button renders ────────────────────────────────────────────
  it('renders the main FAB button', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );
    expect(getByLabelText('Open speed dial')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );
    expect(getByTestId('speed-dial')).toBeTruthy();
  });

  it('main button has accessibilityRole button', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );
    expect(getByLabelText('Open speed dial').props.accessibilityRole).toBe('button');
  });

  // ── Actions appear when open ───────────────────────────────────────
  it('shows action labels after pressing the main button', () => {
    const { getByLabelText, getByText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );

    // Open the speed dial
    act(() => {
      fireEvent.press(getByLabelText('Open speed dial'));
    });

    // Action labels should be rendered (they are always in the tree, but
    // animated opacity 0 when closed; after opening, opacity animates to 1)
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('changes main button label to "Close speed dial" when open', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );

    act(() => {
      fireEvent.press(getByLabelText('Open speed dial'));
    });

    expect(getByLabelText('Close speed dial')).toBeTruthy();
  });

  // ── Each action has label ──────────────────────────────────────────
  it('each action renders its label text', () => {
    const { getByText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );
    // Labels are present in the tree even before opening (rendered with opacity 0)
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('each action button has accessibilityLabel', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );
    expect(getByLabelText('Edit')).toBeTruthy();
    expect(getByLabelText('Share')).toBeTruthy();
    expect(getByLabelText('Delete')).toBeTruthy();
  });

  // ── Pressing action calls onPress and closes ───────────────────────
  it('pressing an action calls its onPress and closes the dial', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={actions} testID="speed-dial" />
    );

    // Open
    act(() => {
      fireEvent.press(getByLabelText('Open speed dial'));
    });

    // Press action
    act(() => {
      fireEvent.press(getByLabelText('Edit'));
    });

    expect(actions[0].onPress).toHaveBeenCalledTimes(1);
    // After pressing action, the dial closes, so the main button label should revert
    expect(getByLabelText('Open speed dial')).toBeTruthy();
  });

  // ── Actions without labels use icon as accessibilityLabel ──────────
  it('action without label uses icon name as accessibilityLabel', () => {
    const noLabelActions = [
      { key: 'add', icon: 'add', onPress: jest.fn() },
    ];
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={noLabelActions} testID="speed-dial" />
    );
    expect(getByLabelText('add')).toBeTruthy();
  });

  // ── Edge: empty actions array ──────────────────────────────────────
  it('renders the main button with empty actions array', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={[]} testID="speed-dial" />
    );
    expect(getByLabelText('Open speed dial')).toBeTruthy();
  });

  it('empty actions array does not crash when toggling', () => {
    const { getByLabelText } = renderWithTheme(
      <SpeedDial actions={[]} testID="speed-dial" />
    );
    expect(() => {
      act(() => {
        fireEvent.press(getByLabelText('Open speed dial'));
      });
    }).not.toThrow();
  });
});

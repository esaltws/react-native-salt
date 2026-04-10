import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Snackbar from '../Snackbar';

describe('Snackbar', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders message when visible', () => {
    const { getByText } = renderWithTheme(
      <Snackbar visible message="Saved" onDismiss={jest.fn()} />
    );
    expect(getByText('Saved')).toBeTruthy();
  });

  it('returns null when not visible', () => {
    const { queryByText } = renderWithTheme(
      <Snackbar visible={false} message="Hidden" onDismiss={jest.fn()} />
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('shows action button and fires callback', () => {
    const onAction = jest.fn();
    const onDismiss = jest.fn();
    const { getByText } = renderWithTheme(
      <Snackbar visible message="Msg" onDismiss={onDismiss} actionLabel="UNDO" onAction={onAction} />
    );
    fireEvent.press(getByText('UNDO'));
    expect(onAction).toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('auto-dismisses after duration', () => {
    const onDismiss = jest.fn();
    renderWithTheme(
      <Snackbar visible message="Auto" onDismiss={onDismiss} duration={4000} />
    );
    jest.advanceTimersByTime(4000);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('has accessibilityRole alert', () => {
    const { getByRole } = renderWithTheme(
      <Snackbar visible message="Alert" onDismiss={jest.fn()} />
    );
    expect(getByRole('alert')).toBeTruthy();
  });
});

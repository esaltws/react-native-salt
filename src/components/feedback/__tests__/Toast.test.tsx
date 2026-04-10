import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Toast from '../Toast';

describe('Toast', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders message when visible', () => {
    const { getByText } = renderWithTheme(
      <Toast visible message="Success!" onDismiss={jest.fn()} />
    );
    expect(getByText('Success!')).toBeTruthy();
  });

  it('returns null when not visible', () => {
    const { queryByText } = renderWithTheme(
      <Toast visible={false} message="Hidden" onDismiss={jest.fn()} />
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('auto-dismisses after duration', () => {
    const onDismiss = jest.fn();
    renderWithTheme(
      <Toast visible message="Auto" onDismiss={onDismiss} duration={3000} />
    );
    jest.advanceTimersByTime(3000);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('does not auto-dismiss when duration is 0', () => {
    const onDismiss = jest.fn();
    renderWithTheme(
      <Toast visible message="Sticky" onDismiss={onDismiss} duration={0} />
    );
    jest.advanceTimersByTime(10000);
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('shows action button when actionLabel provided', () => {
    const onAction = jest.fn();
    const { getByText } = renderWithTheme(
      <Toast visible message="Msg" onDismiss={jest.fn()} actionLabel="Undo" onActionPress={onAction} />
    );
    fireEvent.press(getByText('Undo'));
    expect(onAction).toHaveBeenCalled();
  });

  it('has accessibilityRole alert', () => {
    const { toJSON } = renderWithTheme(
      <Toast visible message="Alert" onDismiss={jest.fn()} />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"accessibilityRole":"alert"');
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Switch from '../Switch';

describe('Switch', () => {
  it('renders with accessibilityRole switch', () => {
    const { getByRole } = renderWithTheme(
      <Switch value={false} onValueChange={jest.fn()} />
    );
    expect(getByRole('switch')).toBeTruthy();
  });

  it('fires onValueChange with toggled value on press', () => {
    const onValueChange = jest.fn();
    const { getByRole } = renderWithTheme(
      <Switch value={false} onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not fire onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByRole } = renderWithTheme(
      <Switch value={false} onValueChange={onValueChange} disabled />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('has correct accessibility state', () => {
    const { getByRole } = renderWithTheme(
      <Switch value={true} onValueChange={jest.fn()} disabled />
    );
    const sw = getByRole('switch');
    expect(sw.props.accessibilityState).toEqual({ checked: true, disabled: true });
  });

  it('applies testID', () => {
    const { getByTestId } = renderWithTheme(
      <Switch value={false} onValueChange={jest.fn()} testID="my-switch" />
    );
    expect(getByTestId('my-switch')).toBeTruthy();
  });
});

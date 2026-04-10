import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    const { queryByText } = renderWithTheme(
      <Checkbox checked={false} onToggle={jest.fn()} />
    );
    expect(queryByText('✓')).toBeNull();
  });

  it('renders checkmark when checked', () => {
    const { getByText } = renderWithTheme(
      <Checkbox checked={true} onToggle={jest.fn()} />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('fires onToggle with negated value on press', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderWithTheme(
      <Checkbox checked={false} onToggle={onToggle} />
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders label and description', () => {
    const { getByText } = renderWithTheme(
      <Checkbox checked={false} onToggle={jest.fn()} label="Accept" description="Terms apply" />
    );
    expect(getByText('Accept')).toBeTruthy();
    expect(getByText('Terms apply')).toBeTruthy();
  });

  it('does not fire onToggle when disabled', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderWithTheme(
      <Checkbox checked={false} onToggle={onToggle} disabled />
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('has correct accessibility state', () => {
    const { getByRole } = renderWithTheme(
      <Checkbox checked={true} onToggle={jest.fn()} disabled />
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox.props.accessibilityState).toEqual({ checked: true, disabled: true });
  });
});

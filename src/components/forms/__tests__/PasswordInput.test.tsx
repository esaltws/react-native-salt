import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import PasswordInput from '../PasswordInput';

describe('PasswordInput', () => {
  it('renders with default label "Password"', () => {
    const { getByText } = renderWithTheme(<PasswordInput />);
    expect(getByText('Password')).toBeTruthy();
  });

  it('has secureTextEntry by default', () => {
    const { getByLabelText } = renderWithTheme(<PasswordInput />);
    const input = getByLabelText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('toggles visibility on eye icon press', () => {
    const { getByLabelText } = renderWithTheme(<PasswordInput />);
    const toggle = getByLabelText('Toggle password visibility');
    fireEvent.press(toggle);
    const input = getByLabelText('Password');
    expect(input.props.secureTextEntry).toBe(false);
  });

  it('shows strength indicator when showStrength and strength are provided', () => {
    const { getByText } = renderWithTheme(
      <PasswordInput showStrength strength="strong" />
    );
    expect(getByText('Strong')).toBeTruthy();
  });

  it('shows weak strength label', () => {
    const { getByText } = renderWithTheme(
      <PasswordInput showStrength strength="weak" />
    );
    expect(getByText('Weak')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <PasswordInput error="Password too short" />
    );
    expect(getByText('Password too short')).toBeTruthy();
  });

  it('shows required asterisk', () => {
    const { getByText } = renderWithTheme(
      <PasswordInput required />
    );
    expect(getByText('*')).toBeTruthy();
  });
});

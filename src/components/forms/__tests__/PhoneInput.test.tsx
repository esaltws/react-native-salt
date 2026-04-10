import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import PhoneInput from '../PhoneInput';

describe('PhoneInput', () => {
  it('renders default US country code', () => {
    const { getByText } = renderWithTheme(
      <PhoneInput value="" onChangeText={jest.fn()} />
    );
    expect(getByText('+1')).toBeTruthy();
    expect(getByText('🇺🇸')).toBeTruthy();
  });

  it('calls onChangeText on input', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <PhoneInput value="" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByLabelText('Phone number'), '5551234');
    expect(onChangeText).toHaveBeenCalledWith('5551234');
  });

  it('shows label when provided', () => {
    const { getByText } = renderWithTheme(
      <PhoneInput value="" onChangeText={jest.fn()} label="Phone" />
    );
    expect(getByText('Phone')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <PhoneInput value="" onChangeText={jest.fn()} error="Invalid number" />
    );
    expect(getByText('Invalid number')).toBeTruthy();
  });

  it('uses specified countryCode', () => {
    const { getByText } = renderWithTheme(
      <PhoneInput value="" onChangeText={jest.fn()} countryCode="GB" />
    );
    expect(getByText('+44')).toBeTruthy();
    expect(getByText('🇬🇧')).toBeTruthy();
  });

  it('shows required asterisk', () => {
    const { getByText } = renderWithTheme(
      <PhoneInput value="" onChangeText={jest.fn()} label="Phone" required />
    );
    expect(getByText('*')).toBeTruthy();
  });
});

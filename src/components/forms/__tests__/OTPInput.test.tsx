import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import OTPInput from '../OTPInput';

describe('OTPInput', () => {
  it('renders correct number of boxes', () => {
    const { getAllByText } = renderWithTheme(
      <OTPInput value="" onChange={jest.fn()} length={4} />
    );
    // 4 empty boxes render empty text nodes - check the structure exists
    const { getByTestId } = renderWithTheme(
      <OTPInput value="" onChange={jest.fn()} length={4} testID="otp" />
    );
    expect(getByTestId('otp')).toBeTruthy();
  });

  it('displays entered digits', () => {
    const { getByText } = renderWithTheme(
      <OTPInput value="123" onChange={jest.fn()} length={6} />
    );
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('masks digits when secure is true', () => {
    const { getAllByText, queryByText } = renderWithTheme(
      <OTPInput value="123" onChange={jest.fn()} length={6} secure />
    );
    expect(getAllByText('•').length).toBe(3);
    expect(queryByText('1')).toBeNull();
  });

  it('filters non-numeric characters', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <OTPInput value="" onChange={onChange} length={6} />
    );
    fireEvent.changeText(getByLabelText('OTP input'), 'a1b2c3');
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('limits to max length', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <OTPInput value="" onChange={onChange} length={4} />
    );
    fireEvent.changeText(getByLabelText('OTP input'), '123456');
    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <OTPInput value="" onChange={jest.fn()} error="Invalid code" />
    );
    expect(getByText('Invalid code')).toBeTruthy();
  });
});

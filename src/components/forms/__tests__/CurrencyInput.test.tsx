import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import CurrencyInput from '../CurrencyInput';

describe('CurrencyInput', () => {
  it('renders currency symbol', () => {
    const { getByText } = renderWithTheme(
      <CurrencyInput value={0} onChange={jest.fn()} currency="€" />
    );
    expect(getByText('€')).toBeTruthy();
  });

  it('renders default $ symbol', () => {
    const { getByText } = renderWithTheme(
      <CurrencyInput value={0} onChange={jest.fn()} />
    );
    expect(getByText('$')).toBeTruthy();
  });

  it('shows label', () => {
    const { getByText } = renderWithTheme(
      <CurrencyInput value={0} onChange={jest.fn()} label="Price" />
    );
    expect(getByText('Price')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <CurrencyInput value={0} onChange={jest.fn()} error="Invalid amount" />
    );
    expect(getByText('Invalid amount')).toBeTruthy();
  });

  it('shows required asterisk', () => {
    const { getByText } = renderWithTheme(
      <CurrencyInput value={0} onChange={jest.fn()} label="Price" required />
    );
    expect(getByText('*')).toBeTruthy();
  });

  it('applies testID', () => {
    const { getByTestId } = renderWithTheme(
      <CurrencyInput value={0} onChange={jest.fn()} testID="ci" />
    );
    expect(getByTestId('ci')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import NumericInput from '../NumericInput';

describe('NumericInput', () => {
  it('renders current value', () => {
    const { getByDisplayValue } = renderWithTheme(
      <NumericInput value={5} onChange={jest.fn()} />
    );
    expect(getByDisplayValue('5')).toBeTruthy();
  });

  it('increments on plus button press', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <NumericInput value={5} onChange={onChange} />
    );
    fireEvent.press(getByLabelText('Increase value'));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('decrements on minus button press', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <NumericInput value={5} onChange={onChange} />
    );
    fireEvent.press(getByLabelText('Decrease value'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('disables decrement at min', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <NumericInput value={0} onChange={onChange} min={0} />
    );
    fireEvent.press(getByLabelText('Decrease value'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables increment at max', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <NumericInput value={10} onChange={onChange} max={10} />
    );
    fireEvent.press(getByLabelText('Increase value'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows label and error', () => {
    const { getByText } = renderWithTheme(
      <NumericInput value={0} onChange={jest.fn()} label="Qty" error="Required" />
    );
    expect(getByText('Qty')).toBeTruthy();
    expect(getByText('Required')).toBeTruthy();
  });
});

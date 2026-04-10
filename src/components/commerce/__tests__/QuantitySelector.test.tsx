import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import QuantitySelector from '../QuantitySelector';

describe('QuantitySelector', () => {
  it('displays the current value', () => {
    const { getByText } = renderWithTheme(
      <QuantitySelector value={5} onValueChange={jest.fn()} testID="qty" />
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('calls onValueChange with incremented value when + is pressed', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <QuantitySelector value={3} onValueChange={onValueChange} testID="qty" />
    );
    fireEvent.press(getByLabelText('Increase quantity'));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('calls onValueChange with decremented value when - is pressed', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <QuantitySelector value={3} onValueChange={onValueChange} testID="qty" />
    );
    fireEvent.press(getByLabelText('Decrease quantity'));
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it('disables decrement button when value equals min', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <QuantitySelector value={1} min={1} onValueChange={onValueChange} testID="qty" />
    );
    const decreaseBtn = getByLabelText('Decrease quantity');
    expect(decreaseBtn.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(decreaseBtn);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('disables increment button when value equals max', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <QuantitySelector value={10} max={10} onValueChange={onValueChange} testID="qty" />
    );
    const increaseBtn = getByLabelText('Increase quantity');
    expect(increaseBtn.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(increaseBtn);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('respects custom min and max bounds', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <QuantitySelector value={5} min={5} max={5} onValueChange={onValueChange} testID="qty" />
    );
    fireEvent.press(getByLabelText('Decrease quantity'));
    fireEvent.press(getByLabelText('Increase quantity'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

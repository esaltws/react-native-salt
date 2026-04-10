import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import PromoInput from '../PromoInput';

describe('PromoInput', () => {
  it('renders Apply button and input placeholder', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <PromoInput
        value=""
        onChangeText={jest.fn()}
        onApply={jest.fn()}
        testID="promo"
      />
    );
    expect(getByText('Apply')).toBeTruthy();
    expect(getByPlaceholderText('Enter promo code')).toBeTruthy();
  });

  it('disables Apply button when value is empty', () => {
    const onApply = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <PromoInput
        value=""
        onChangeText={jest.fn()}
        onApply={onApply}
        testID="promo"
      />
    );
    const applyBtn = getByLabelText('Apply promo code');
    expect(applyBtn.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(applyBtn);
    expect(onApply).not.toHaveBeenCalled();
  });

  it('calls onApply with trimmed value when Apply is pressed', () => {
    const onApply = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <PromoInput
        value="  SAVE20  "
        onChangeText={jest.fn()}
        onApply={onApply}
        testID="promo"
      />
    );
    fireEvent.press(getByLabelText('Apply promo code'));
    expect(onApply).toHaveBeenCalledWith('SAVE20');
  });

  it('shows success message when status is success', () => {
    const { getByText } = renderWithTheme(
      <PromoInput
        value="CODE"
        onChangeText={jest.fn()}
        onApply={jest.fn()}
        status="success"
        successMessage="Discount applied!"
        testID="promo"
      />
    );
    expect(getByText('Discount applied!')).toBeTruthy();
  });

  it('shows error message when status is error', () => {
    const { getByText } = renderWithTheme(
      <PromoInput
        value="BAD"
        onChangeText={jest.fn()}
        onApply={jest.fn()}
        status="error"
        errorMessage="Code expired"
        testID="promo"
      />
    );
    expect(getByText('Code expired')).toBeTruthy();
  });

  it('applies uppercase text transform to input', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <PromoInput
        value=""
        onChangeText={jest.fn()}
        onApply={jest.fn()}
        testID="promo"
      />
    );
    const input = getByPlaceholderText('Enter promo code');
    const flatStyle = Object.assign(
      {},
      ...([].concat(input.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.textTransform).toBe('uppercase');
  });

  it('shows loading indicator when status is loading', () => {
    const { UNSAFE_getByType, queryByText } = renderWithTheme(
      <PromoInput
        value="CODE"
        onChangeText={jest.fn()}
        onApply={jest.fn()}
        status="loading"
        testID="promo"
      />
    );
    const { ActivityIndicator } = require('react-native');
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    // Apply text should be replaced by spinner
    expect(queryByText('Apply')).toBeNull();
  });
});

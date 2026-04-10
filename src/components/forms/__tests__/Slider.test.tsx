import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Slider from '../Slider';

describe('Slider', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <Slider value={50} onValueChange={jest.fn()} testID="slider" />
    );
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('has correct accessibility values', () => {
    const { getByTestId } = renderWithTheme(
      <Slider value={30} onValueChange={jest.fn()} min={0} max={100} testID="slider" />
    );
    const slider = getByTestId('slider');
    expect(slider.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 30 });
  });

  it('shows value when showValue is true', () => {
    const { getByText } = renderWithTheme(
      <Slider value={42} onValueChange={jest.fn()} showValue />
    );
    expect(getByText('42')).toBeTruthy();
  });

  it('has disabled accessibility state when disabled', () => {
    const { getByTestId } = renderWithTheme(
      <Slider value={50} onValueChange={jest.fn()} disabled testID="slider" />
    );
    expect(getByTestId('slider').props.accessibilityState.disabled).toBe(true);
  });

  it('renders with accessibilityRole adjustable', () => {
    const { getByRole } = renderWithTheme(
      <Slider value={50} onValueChange={jest.fn()} />
    );
    expect(getByRole('adjustable')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import RangeSlider from '../RangeSlider';

describe('RangeSlider', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <RangeSlider low={20} high={80} onChangeRange={jest.fn()} testID="rs" />
    );
    expect(getByTestId('rs')).toBeTruthy();
  });

  it('shows values when showValues is true', () => {
    const { getByText } = renderWithTheme(
      <RangeSlider low={25} high={75} onChangeRange={jest.fn()} showValues />
    );
    expect(getByText('25')).toBeTruthy();
    expect(getByText('75')).toBeTruthy();
  });

  it('shows min and max labels', () => {
    const { getByText } = renderWithTheme(
      <RangeSlider low={20} high={80} onChangeRange={jest.fn()} min={0} max={100} />
    );
    expect(getByText('0')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  it('uses custom formatValue', () => {
    const { getByText } = renderWithTheme(
      <RangeSlider low={20} high={80} onChangeRange={jest.fn()} formatValue={(v) => `$${v}`} showValues />
    );
    expect(getByText('$20')).toBeTruthy();
    expect(getByText('$80')).toBeTruthy();
  });

  it('has accessibility labels for thumbs', () => {
    const { getByLabelText } = renderWithTheme(
      <RangeSlider low={20} high={80} onChangeRange={jest.fn()} />
    );
    // Thumbs render only when trackWidth > 0, so they may not appear in test
    expect(getByLabelText('Minimum value')).toBeTruthy();
  });
});

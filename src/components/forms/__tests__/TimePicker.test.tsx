import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import TimePicker from '../TimePicker';

describe('TimePicker', () => {
  it('renders time display', () => {
    const { getByText } = renderWithTheme(
      <TimePicker value={{ hours: 14, minutes: 30 }} onChange={jest.fn()} />
    );
    expect(getByText(/02:30/)).toBeTruthy(); // 12h format shows 2:30
  });

  it('shows AM/PM in 12h format', () => {
    const { getAllByText } = renderWithTheme(
      <TimePicker value={{ hours: 14, minutes: 0 }} onChange={jest.fn()} format="12h" />
    );
    expect(getAllByText('PM').length).toBeGreaterThanOrEqual(1);
  });

  it('does not show AM/PM in 24h format', () => {
    const { queryByText } = renderWithTheme(
      <TimePicker value={{ hours: 14, minutes: 0 }} onChange={jest.fn()} format="24h" />
    );
    expect(queryByText('AM')).toBeNull();
    expect(queryByText('PM')).toBeNull();
  });

  it('calls onChange when hour is selected', () => {
    const onChange = jest.fn();
    const { getAllByLabelText } = renderWithTheme(
      <TimePicker value={{ hours: 9, minutes: 0 }} onChange={onChange} format="12h" />
    );
    fireEvent.press(getAllByLabelText('10')[0]);
    expect(onChange).toHaveBeenCalled();
  });

  it('applies testID', () => {
    const { getByTestId } = renderWithTheme(
      <TimePicker value={{ hours: 0, minutes: 0 }} onChange={jest.fn()} testID="tp" />
    );
    expect(getByTestId('tp')).toBeTruthy();
  });
});

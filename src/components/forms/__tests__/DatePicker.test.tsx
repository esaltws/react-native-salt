import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  it('renders day labels', () => {
    const { getByText } = renderWithTheme(
      <DatePicker onChange={jest.fn()} />
    );
    expect(getByText('Su')).toBeTruthy();
    expect(getByText('Mo')).toBeTruthy();
    expect(getByText('Sa')).toBeTruthy();
  });

  it('renders month and year header', () => {
    const date = new Date(2024, 5, 15); // June 2024
    const { getByText } = renderWithTheme(
      <DatePicker value={date} onChange={jest.fn()} />
    );
    expect(getByText('June 2024')).toBeTruthy();
  });

  it('calls onChange when a day is selected', () => {
    const onChange = jest.fn();
    const date = new Date(2024, 5, 15);
    const { getByText } = renderWithTheme(
      <DatePicker value={date} onChange={onChange} />
    );
    fireEvent.press(getByText('20'));
    expect(onChange).toHaveBeenCalled();
    const selected = onChange.mock.calls[0][0];
    expect(selected.getDate()).toBe(20);
  });

  it('navigates to previous month', () => {
    const date = new Date(2024, 0, 15); // January 2024
    const { getByLabelText, getByText } = renderWithTheme(
      <DatePicker value={date} onChange={jest.fn()} />
    );
    fireEvent.press(getByLabelText('Previous month'));
    expect(getByText('December 2023')).toBeTruthy();
  });

  it('navigates to next month', () => {
    const date = new Date(2024, 11, 15); // December 2024
    const { getByLabelText, getByText } = renderWithTheme(
      <DatePicker value={date} onChange={jest.fn()} />
    );
    fireEvent.press(getByLabelText('Next month'));
    expect(getByText('January 2025')).toBeTruthy();
  });

  it('disables dates before minDate', () => {
    const date = new Date(2024, 5, 15);
    const minDate = new Date(2024, 5, 10);
    const onChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <DatePicker value={date} onChange={onChange} minDate={minDate} />
    );
    const day5 = getByLabelText('June 5, 2024');
    expect(day5.props.accessibilityState.disabled).toBe(true);
  });

  it('applies testID', () => {
    const { getByTestId } = renderWithTheme(
      <DatePicker onChange={jest.fn()} testID="dp" />
    );
    expect(getByTestId('dp')).toBeTruthy();
  });
});

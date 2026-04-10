import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import SegmentedControl from '../SegmentedControl';

const mockItems = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

describe('SegmentedControl', () => {
  it('renders all segment labels', () => {
    const { getByText } = renderWithTheme(
      <SegmentedControl items={mockItems} selected="day" onSelect={jest.fn()} />
    );

    expect(getByText('Day')).toBeTruthy();
    expect(getByText('Week')).toBeTruthy();
    expect(getByText('Month')).toBeTruthy();
  });

  it('marks the selected segment with accessibilityState selected', () => {
    const { getAllByRole } = renderWithTheme(
      <SegmentedControl items={mockItems} selected="week" onSelect={jest.fn()} />
    );

    const tabs = getAllByRole('tab');
    expect(tabs[1].props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true })
    );
    expect(tabs[0].props.accessibilityState).toEqual(
      expect.objectContaining({ selected: false })
    );
  });

  it('calls onSelect with the correct key when a segment is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <SegmentedControl items={mockItems} selected="day" onSelect={onSelect} />
    );

    fireEvent.press(getByText('Month'));
    expect(onSelect).toHaveBeenCalledWith('month');
  });

  it('does not call onSelect when disabled', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <SegmentedControl items={mockItems} selected="day" onSelect={onSelect} disabled />
    );

    fireEvent.press(getByText('Month'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('applies reduced opacity when disabled', () => {
    const { getByTestId } = renderWithTheme(
      <SegmentedControl
        items={mockItems}
        selected="day"
        onSelect={jest.fn()}
        disabled
        testID="seg-ctrl"
      />
    );

    const container = getByTestId('seg-ctrl');
    const flatStyle = Array.isArray(container.props.style)
      ? Object.assign({}, ...container.props.style.filter(Boolean))
      : container.props.style;
    expect(flatStyle.opacity).toBe(0.5);
  });

  it('renders with different size variants without crashing', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      const { getByText } = renderWithTheme(
        <SegmentedControl items={mockItems} selected="day" onSelect={jest.fn()} size={size} />
      );
      expect(getByText('Day')).toBeTruthy();
    });
  });
});

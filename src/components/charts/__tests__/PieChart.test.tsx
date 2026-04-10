import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import PieChart from '../PieChart';

const sampleSlices = [
  { key: 'a', value: 40, label: 'Red', color: '#ff0000' },
  { key: 'b', value: 30, label: 'Green', color: '#00ff00' },
  { key: 'c', value: 30, label: 'Blue', color: '#0000ff' },
];

describe('PieChart', () => {
  it('returns null when total of all slice values is 0', () => {
    const slices = [
      { key: 'a', value: 0, label: 'Empty', color: '#ccc' },
      { key: 'b', value: 0, label: 'Also Empty', color: '#ddd' },
    ];
    const { toJSON } = renderWithTheme(
      <PieChart slices={slices} testID="pie" />
    );
    expect(toJSON()).toBeNull();
  });

  it('renders chart and legend by default', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <PieChart slices={sampleSlices} testID="pie" />
    );
    expect(getByTestId('pie')).toBeTruthy();
    expect(getByText('Red')).toBeTruthy();
    expect(getByText('Green')).toBeTruthy();
    expect(getByText('Blue')).toBeTruthy();
  });

  it('renders legend with percentages', () => {
    const { getByText, getAllByText } = renderWithTheme(
      <PieChart slices={sampleSlices} testID="pie" />
    );
    // 40 out of 100 = 40.0%, 30 out of 100 = 30.0% (two slices have 30%)
    expect(getByText('40.0%')).toBeTruthy();
    expect(getAllByText('30.0%').length).toBe(2);
  });

  it('renders donut hole when donut is true', () => {
    const { getByTestId } = renderWithTheme(
      <PieChart slices={sampleSlices} donut testID="pie" />
    );
    expect(getByTestId('pie')).toBeTruthy();
  });

  it('renders centerLabel and centerValue in donut mode', () => {
    const { getByText } = renderWithTheme(
      <PieChart
        slices={sampleSlices}
        donut
        centerLabel="Total"
        centerValue="100"
        testID="pie"
      />
    );
    expect(getByText('Total')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  it('hides legend when showLegend is false', () => {
    const { queryByText } = renderWithTheme(
      <PieChart slices={sampleSlices} showLegend={false} testID="pie" />
    );
    // Legend labels should not be present
    expect(queryByText('Red')).toBeNull();
    expect(queryByText('40.0%')).toBeNull();
  });

  it('renders correctly with a single slice', () => {
    const slices = [{ key: 'only', value: 100, label: 'Only', color: '#ff0000' }];
    const { getByText, getByTestId } = renderWithTheme(
      <PieChart slices={slices} testID="pie" />
    );
    expect(getByTestId('pie')).toBeTruthy();
    expect(getByText('Only')).toBeTruthy();
    expect(getByText('100.0%')).toBeTruthy();
  });
});

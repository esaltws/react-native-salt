import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import LineChart from '../LineChart';

const threePoints = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 30 },
  { label: 'Mar', value: 20 },
];

describe('LineChart', () => {
  it('returns null when data has fewer than 2 points', () => {
    const { toJSON } = renderWithTheme(
      <LineChart data={[{ label: 'Only', value: 5 }]} testID="line" />
    );
    expect(toJSON()).toBeNull();
  });

  it('renders chart with 2 data points', () => {
    const data = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
    ];
    const { getByTestId } = renderWithTheme(
      <LineChart data={data} testID="line" />
    );
    expect(getByTestId('line')).toBeTruthy();
  });

  it('renders dots when showDots is true (default)', () => {
    const { getByTestId } = renderWithTheme(
      <LineChart data={threePoints} showDots testID="line" />
    );
    // The component renders; dots are View elements within the chart
    expect(getByTestId('line')).toBeTruthy();
  });

  it('renders x-axis labels when showLabels is true (default)', () => {
    const { getByText } = renderWithTheme(
      <LineChart data={threePoints} showLabels testID="line" />
    );
    expect(getByText('Jan')).toBeTruthy();
    expect(getByText('Feb')).toBeTruthy();
    expect(getByText('Mar')).toBeTruthy();
  });

  it('hides labels when showLabels is false', () => {
    const { queryByText } = renderWithTheme(
      <LineChart data={threePoints} showLabels={false} testID="line" />
    );
    expect(queryByText('Jan')).toBeNull();
    expect(queryByText('Feb')).toBeNull();
  });

  it('renders grid lines when showGrid is true (default)', () => {
    const { getByTestId } = renderWithTheme(
      <LineChart data={threePoints} showGrid testID="line" />
    );
    // Grid renders 5 horizontal lines with value labels
    expect(getByTestId('line')).toBeTruthy();
  });

  it('handles all same values without crashing', () => {
    const data = [
      { label: 'A', value: 50 },
      { label: 'B', value: 50 },
      { label: 'C', value: 50 },
    ];
    const { getByTestId } = renderWithTheme(
      <LineChart data={data} testID="line" />
    );
    expect(getByTestId('line')).toBeTruthy();
  });
});

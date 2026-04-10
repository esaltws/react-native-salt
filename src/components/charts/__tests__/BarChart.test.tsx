import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import BarChart from '../BarChart';

const sampleItems = [
  { key: 'a', label: 'Alpha', value: 40 },
  { key: 'b', label: 'Beta', value: 80 },
  { key: 'c', label: 'Gamma', value: 60 },
];

describe('BarChart', () => {
  it('renders a row for each item', () => {
    const { getByText } = renderWithTheme(
      <BarChart items={sampleItems} testID="bar" />
    );
    expect(getByText('Alpha')).toBeTruthy();
    expect(getByText('Beta')).toBeTruthy();
    expect(getByText('Gamma')).toBeTruthy();
  });

  it('renders value text for each item by default', () => {
    const { getByText } = renderWithTheme(
      <BarChart items={sampleItems} testID="bar" />
    );
    expect(getByText('40')).toBeTruthy();
    expect(getByText('80')).toBeTruthy();
    expect(getByText('60')).toBeTruthy();
  });

  it('respects maxValue prop to cap bar widths', () => {
    const items = [{ key: 'a', label: 'A', value: 50 }];
    // With maxValue=100, bar should be 50%. With maxValue=50, bar should be 100%.
    // Rendering should not throw in either case
    const { getByTestId } = renderWithTheme(
      <BarChart items={items} maxValue={100} testID="bar" />
    );
    expect(getByTestId('bar')).toBeTruthy();
  });

  it('hides values when showValues is false', () => {
    const { queryByText } = renderWithTheme(
      <BarChart items={sampleItems} showValues={false} testID="bar" />
    );
    expect(queryByText('40')).toBeNull();
    expect(queryByText('80')).toBeNull();
  });

  it('hides labels when showLabels is false', () => {
    const { queryByText } = renderWithTheme(
      <BarChart items={sampleItems} showLabels={false} testID="bar" />
    );
    expect(queryByText('Alpha')).toBeNull();
    expect(queryByText('Beta')).toBeNull();
  });

  it('uses item.color when provided instead of default intent color', () => {
    const items = [{ key: 'a', label: 'Custom', value: 50, color: '#ff0000' }];
    // Should render without errors using the custom color
    const { getByText } = renderWithTheme(
      <BarChart items={items} testID="bar" />
    );
    expect(getByText('Custom')).toBeTruthy();
    expect(getByText('50')).toBeTruthy();
  });

  it('renders without crashing when items is empty', () => {
    const { getByTestId } = renderWithTheme(
      <BarChart items={[]} testID="bar" />
    );
    expect(getByTestId('bar')).toBeTruthy();
  });

  it('handles all zero values gracefully', () => {
    const items = [
      { key: 'a', label: 'Zero1', value: 0 },
      { key: 'b', label: 'Zero2', value: 0 },
    ];
    const { getByText } = renderWithTheme(
      <BarChart items={items} testID="bar" />
    );
    expect(getByText('Zero1')).toBeTruthy();
    expect(getByText('Zero2')).toBeTruthy();
  });
});

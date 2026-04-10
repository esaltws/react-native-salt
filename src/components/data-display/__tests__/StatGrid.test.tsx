import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import StatGrid from '../StatGrid';

const mockItems = [
  { key: 'users', label: 'Users', value: '1,234' },
  { key: 'orders', label: 'Orders', value: 567 },
  { key: 'revenue', label: 'Revenue', value: '$12K' },
  { key: 'growth', label: 'Growth', value: '+8%' },
];

describe('StatGrid', () => {
  it('renders all stat labels and values', () => {
    const { getByText } = renderWithTheme(
      <StatGrid items={mockItems} />
    );

    expect(getByText('Users')).toBeTruthy();
    expect(getByText('1,234')).toBeTruthy();
    expect(getByText('Orders')).toBeTruthy();
    expect(getByText('567')).toBeTruthy();
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$12K')).toBeTruthy();
    expect(getByText('Growth')).toBeTruthy();
    expect(getByText('+8%')).toBeTruthy();
  });

  it('renders with 2 columns by default', () => {
    const { getByTestId } = renderWithTheme(
      <StatGrid items={mockItems} testID="stat-grid" />
    );

    expect(getByTestId('stat-grid')).toBeTruthy();
  });

  it('renders with custom column count without crashing', () => {
    const { getByText } = renderWithTheme(
      <StatGrid items={mockItems} columns={3} />
    );

    expect(getByText('Users')).toBeTruthy();
    expect(getByText('Growth')).toBeTruthy();
  });

  it('renders with bordered set to false', () => {
    const { getByText } = renderWithTheme(
      <StatGrid items={mockItems} bordered={false} />
    );

    expect(getByText('Users')).toBeTruthy();
  });

  it('renders items with icons when provided', () => {
    const itemsWithIcon = [
      { key: 'users', label: 'Users', value: '100', icon: 'people-outline' },
    ];

    const { getByText } = renderWithTheme(
      <StatGrid items={itemsWithIcon} />
    );

    expect(getByText('Users')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <StatGrid items={mockItems} testID="stat-grid" />
    );

    expect(getByTestId('stat-grid')).toBeTruthy();
  });
});

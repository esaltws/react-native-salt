import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import MetricCard from '../MetricCard';

describe('MetricCard', () => {
  it('renders title and value', () => {
    const { getByText } = renderWithTheme(
      <MetricCard title="Revenue" value="$12,345" />
    );

    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$12,345')).toBeTruthy();
  });

  it('renders numeric value', () => {
    const { getByText } = renderWithTheme(
      <MetricCard title="Users" value={1234} />
    );

    expect(getByText('1234')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <MetricCard title="Revenue" value="$12,345" subtitle="vs last month" />
    );

    expect(getByText('vs last month')).toBeTruthy();
  });

  it('renders trend value for an upward trend', () => {
    const { getByText } = renderWithTheme(
      <MetricCard title="Revenue" value="$12,345" trend="up" trendValue="+12%" />
    );

    expect(getByText('+12%')).toBeTruthy();
  });

  it('renders trend value for a downward trend', () => {
    const { getByText } = renderWithTheme(
      <MetricCard title="Revenue" value="$12,345" trend="down" trendValue="-5%" />
    );

    expect(getByText('-5%')).toBeTruthy();
  });

  it('applies a left border as intent indicator', () => {
    const { getByTestId } = renderWithTheme(
      <MetricCard title="Errors" value="42" intent="danger" testID="metric" />
    );

    const card = getByTestId('metric');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.borderLeftWidth).toBe(3);
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <MetricCard title="Test" value="0" testID="metric-card" />
    );

    expect(getByTestId('metric-card')).toBeTruthy();
  });
});

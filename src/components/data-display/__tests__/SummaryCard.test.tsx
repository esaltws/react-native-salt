import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import SummaryCard from '../SummaryCard';

describe('SummaryCard', () => {
  it('renders the label', () => {
    const { getByText } = renderWithTheme(
      <SummaryCard label="Total Revenue" value="$50,000" />
    );

    expect(getByText('Total Revenue')).toBeTruthy();
  });

  it('renders the value', () => {
    const { getByText } = renderWithTheme(
      <SummaryCard label="Total Revenue" value="$50,000" />
    );

    expect(getByText('$50,000')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <SummaryCard label="Revenue" value="$50,000" subtitle="Last 30 days" />
    );

    expect(getByText('Last 30 days')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = renderWithTheme(
      <SummaryCard label="Revenue" value="$50,000" />
    );

    expect(queryByText('Last 30 days')).toBeNull();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <SummaryCard label="Revenue" value="$50,000" testID="summary-card" />
    );

    expect(getByTestId('summary-card')).toBeTruthy();
  });
});

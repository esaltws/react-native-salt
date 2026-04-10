import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import ComparisonTable from '../ComparisonTable';

const plans = [
  { key: 'free', name: 'Free' },
  { key: 'pro', name: 'Pro', highlight: true, badge: 'Popular' },
  { key: 'enterprise', name: 'Enterprise' },
];

const features = [
  { key: 'storage', label: 'Storage', values: { free: '1 GB', pro: '50 GB', enterprise: 'Unlimited' } },
  { key: 'support', label: 'Support', values: { free: false, pro: true, enterprise: true } },
  { key: 'api', label: 'API Access', values: { free: false, pro: false, enterprise: true } },
];

describe('ComparisonTable', () => {
  it('renders plan names in the header', () => {
    const { getByText } = renderWithTheme(
      <ComparisonTable plans={plans} features={features} />
    );

    expect(getByText('Free')).toBeTruthy();
    expect(getByText('Pro')).toBeTruthy();
    expect(getByText('Enterprise')).toBeTruthy();
  });

  it('renders feature labels', () => {
    const { getByText } = renderWithTheme(
      <ComparisonTable plans={plans} features={features} />
    );

    expect(getByText('Storage')).toBeTruthy();
    expect(getByText('Support')).toBeTruthy();
    expect(getByText('API Access')).toBeTruthy();
  });

  it('renders string feature values', () => {
    const { getByText } = renderWithTheme(
      <ComparisonTable plans={plans} features={features} />
    );

    expect(getByText('1 GB')).toBeTruthy();
    expect(getByText('50 GB')).toBeTruthy();
    expect(getByText('Unlimited')).toBeTruthy();
  });

  it('renders the badge on highlighted plans', () => {
    const { getByText } = renderWithTheme(
      <ComparisonTable plans={plans} features={features} />
    );

    expect(getByText('Popular')).toBeTruthy();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <ComparisonTable plans={plans} features={features} testID="comparison" />
    );

    expect(getByTestId('comparison')).toBeTruthy();
  });
});

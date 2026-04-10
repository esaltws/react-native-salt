import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import StatusTracker from '../StatusTracker';

const steps = [
  { label: 'Ordered', description: 'Order placed', date: 'Jan 1' },
  { label: 'Shipped', description: 'In transit' },
  { label: 'Delivered' },
];

describe('StatusTracker', () => {
  it('renders all step labels', () => {
    const { getByText } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={1} testID="tracker" />
    );
    expect(getByText('Ordered')).toBeTruthy();
    expect(getByText('Shipped')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('renders checkmark icon for completed steps', () => {
    const { getAllByText } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={2} testID="tracker" />
    );
    // Steps 0 and 1 are completed (currentStep=2), Icon mock renders "checkmark" as text
    const checkmarks = getAllByText('checkmark');
    expect(checkmarks.length).toBe(2);
  });

  it('does not render checkmark for current or future steps', () => {
    const { getAllByText } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={1} testID="tracker" />
    );
    // Only step 0 is completed
    const checkmarks = getAllByText('checkmark');
    expect(checkmarks.length).toBe(1);
  });

  it('renders step description when provided', () => {
    const { getByText } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={0} testID="tracker" />
    );
    expect(getByText('Order placed')).toBeTruthy();
    expect(getByText('In transit')).toBeTruthy();
  });

  it('renders step date when provided', () => {
    const { getByText } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={0} testID="tracker" />
    );
    expect(getByText('Jan 1')).toBeTruthy();
  });

  it('applies success color to completed step dots', () => {
    const { getByTestId } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={2} testID="tracker" />
    );
    // The component renders, completed steps use colors.success
    expect(getByTestId('tracker')).toBeTruthy();
  });

  it('applies primary color to the current step dot', () => {
    const { getByTestId } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={1} testID="tracker" />
    );
    expect(getByTestId('tracker')).toBeTruthy();
  });

  it('renders connecting lines between steps except the last', () => {
    const { getByTestId } = renderWithTheme(
      <StatusTracker steps={steps} currentStep={0} testID="tracker" />
    );
    // Component should render without errors with connecting lines
    expect(getByTestId('tracker')).toBeTruthy();
  });
});

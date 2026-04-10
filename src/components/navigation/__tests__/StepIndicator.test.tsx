import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import StepIndicator from '../StepIndicator';

const steps = ['Account', 'Address', 'Payment', 'Review'];

describe('StepIndicator', () => {
  it('renders all step labels', () => {
    const { getByText } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={0} />
    );

    expect(getByText('Account')).toBeTruthy();
    expect(getByText('Address')).toBeTruthy();
    expect(getByText('Payment')).toBeTruthy();
    expect(getByText('Review')).toBeTruthy();
  });

  it('renders step numbers for incomplete steps', () => {
    const { getByText } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={1} />
    );

    // Step 3 (index 2) should display "3"
    expect(getByText('3')).toBeTruthy();
    // Step 4 (index 3) should display "4"
    expect(getByText('4')).toBeTruthy();
  });

  it('renders a checkmark for completed steps', () => {
    const { getAllByText } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={2} />
    );

    // Steps 0 and 1 are completed (index < currentStep), so two checkmarks
    const checkmarks = getAllByText('\u2713');
    expect(checkmarks).toHaveLength(2);
  });

  it('shows the current step number (not checkmark) for the active step', () => {
    const { getByText, getAllByText } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={2} />
    );

    // currentStep=2 means step index 2 is current, so display "3"
    expect(getByText('3')).toBeTruthy();
    // Only 2 completed steps (0, 1)
    const checkmarks = getAllByText('\u2713');
    expect(checkmarks).toHaveLength(2);
  });

  it('renders no checkmarks when on the first step', () => {
    const { queryByText } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={0} />
    );

    expect(queryByText('\u2713')).toBeNull();
  });

  it('renders all checkmarks when all steps are completed', () => {
    const { getAllByText } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={4} />
    );

    // All 4 steps should be completed
    const checkmarks = getAllByText('\u2713');
    expect(checkmarks).toHaveLength(4);
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <StepIndicator steps={steps} currentStep={0} testID="step-indicator" />
    );

    expect(getByTestId('step-indicator')).toBeTruthy();
  });
});

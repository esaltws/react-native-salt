import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  it('renders default title and description', () => {
    const { getByText } = renderWithTheme(<ErrorState />);
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Please try again.')).toBeTruthy();
  });

  it('renders custom title and description', () => {
    const { getByText } = renderWithTheme(
      <ErrorState title="Network Error" description="Check your connection." />
    );
    expect(getByText('Network Error')).toBeTruthy();
    expect(getByText('Check your connection.')).toBeTruthy();
  });

  it('renders Retry button when onRetry is provided', () => {
    const onRetry = jest.fn();
    const { getByText } = renderWithTheme(<ErrorState onRetry={onRetry} />);
    expect(getByText('Retry')).toBeTruthy();
  });

  it('calls onRetry when Retry button is pressed', () => {
    const onRetry = jest.fn();
    const { getByText } = renderWithTheme(<ErrorState onRetry={onRetry} />);
    fireEvent.press(getByText('Retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render Retry button when onRetry is not provided', () => {
    const { queryByText } = renderWithTheme(<ErrorState />);
    expect(queryByText('Retry')).toBeNull();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <ErrorState testID="error-state" />
    );
    expect(getByTestId('error-state')).toBeTruthy();
  });
});

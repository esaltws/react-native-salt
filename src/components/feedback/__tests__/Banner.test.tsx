import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Banner from '../Banner';

describe('Banner', () => {
  it('renders title', () => {
    const { getByText } = renderWithTheme(
      <Banner title="Warning" />
    );
    expect(getByText('Warning')).toBeTruthy();
  });

  it('renders message', () => {
    const { getByText } = renderWithTheme(
      <Banner title="Info" message="Something to know" />
    );
    expect(getByText('Something to know')).toBeTruthy();
  });

  it('has accessibilityRole alert', () => {
    const { getByRole } = renderWithTheme(
      <Banner title="Alert" />
    );
    expect(getByRole('alert')).toBeTruthy();
  });

  it('shows dismiss button and hides on press', () => {
    const onDismiss = jest.fn();
    const { getByLabelText, queryByText } = renderWithTheme(
      <Banner title="Dismiss me" dismissible onDismiss={onDismiss} />
    );
    fireEvent.press(getByLabelText('Dismiss'));
    expect(onDismiss).toHaveBeenCalled();
    expect(queryByText('Dismiss me')).toBeNull();
  });

  it('shows action button', () => {
    const onAction = jest.fn();
    const { getByText } = renderWithTheme(
      <Banner title="Action" actionLabel="Learn more" onAction={onAction} />
    );
    fireEvent.press(getByText('Learn more'));
    expect(onAction).toHaveBeenCalled();
  });
});

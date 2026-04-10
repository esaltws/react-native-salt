import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import AuthDivider from '../AuthDivider';

describe('AuthDivider', () => {
  it('renders default text "or continue with"', () => {
    const { getByText } = renderWithTheme(<AuthDivider />);
    expect(getByText('or continue with')).toBeTruthy();
  });

  it('renders custom text when provided', () => {
    const { getByText } = renderWithTheme(
      <AuthDivider text="or sign up with" />
    );
    expect(getByText('or sign up with')).toBeTruthy();
  });

  it('does not render default text when custom text is given', () => {
    const { queryByText } = renderWithTheme(
      <AuthDivider text="or log in with" />
    );
    expect(queryByText('or continue with')).toBeNull();
    expect(queryByText('or log in with')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <AuthDivider testID="auth-divider" />
    );
    expect(getByTestId('auth-divider')).toBeTruthy();
  });
});

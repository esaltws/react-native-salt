import React from 'react';
import { ActivityIndicator } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import SocialButton from '../SocialButton';

describe('SocialButton', () => {
  const onPress = jest.fn();

  beforeEach(() => {
    onPress.mockClear();
  });

  it('renders the default label for a given provider', () => {
    const { getByText } = renderWithTheme(
      <SocialButton provider="google" onPress={onPress} />
    );
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('renders a custom label when provided', () => {
    const { getByText } = renderWithTheme(
      <SocialButton provider="github" onPress={onPress} label="Sign in with GitHub" />
    );
    expect(getByText('Sign in with GitHub')).toBeTruthy();
  });

  it('shows ActivityIndicator when loading', () => {
    const { UNSAFE_getByType } = renderWithTheme(
      <SocialButton provider="apple" onPress={onPress} loading />
    );
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('does not show label text when loading', () => {
    const { queryByText } = renderWithTheme(
      <SocialButton provider="apple" onPress={onPress} loading />
    );
    expect(queryByText('Continue with Apple')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = renderWithTheme(
      <SocialButton provider="facebook" onPress={onPress} />
    );
    fireEvent.press(getByText('Continue with Facebook'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const { getByText } = renderWithTheme(
      <SocialButton provider="twitter" onPress={onPress} disabled />
    );
    fireEvent.press(getByText('Continue with Twitter'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('hides label in icon-only variant', () => {
    const { queryByText } = renderWithTheme(
      <SocialButton provider="microsoft" onPress={onPress} variant="icon-only" />
    );
    expect(queryByText('Continue with Microsoft')).toBeNull();
  });

  it('renders outline variant without filled background', () => {
    const { getByText } = renderWithTheme(
      <SocialButton provider="google" onPress={onPress} variant="outline" />
    );
    expect(getByText('Continue with Google')).toBeTruthy();
  });
});

import React from 'react';
import { Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import FormScreen from '../FormScreen';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style, ...rest }: any) =>
      React.createElement(View, { ...rest, style, testID: rest.testID ?? 'safe-area-view' }, children),
  };
});

describe('FormScreen', () => {
  it('renders with KeyboardAvoidingView wrapper', () => {
    const { UNSAFE_queryByType } = renderWithTheme(
      <FormScreen title="Test Form">
        <Text>Form content</Text>
      </FormScreen>
    );

    const kav = UNSAFE_queryByType(KeyboardAvoidingView);
    expect(kav).not.toBeNull();
  });

  it('renders title text', () => {
    const { getByText } = renderWithTheme(
      <FormScreen title="Sign Up">
        <Text>Form content</Text>
      </FormScreen>
    );

    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <FormScreen title="Sign Up" subtitle="Enter your details">
        <Text>Form content</Text>
      </FormScreen>
    );

    expect(getByText('Enter your details')).toBeTruthy();
  });

  it('renders children in a ScrollView by default (scrollable=true)', () => {
    const { getByText, UNSAFE_queryByType } = renderWithTheme(
      <FormScreen title="Test">
        <Text>Scrollable content</Text>
      </FormScreen>
    );

    expect(getByText('Scrollable content')).toBeTruthy();
    const scrollView = UNSAFE_queryByType(ScrollView);
    expect(scrollView).not.toBeNull();
  });

  it('does not render ScrollView when scrollable is false', () => {
    const { UNSAFE_queryByType } = renderWithTheme(
      <FormScreen title="Test" scrollable={false}>
        <Text>Static content</Text>
      </FormScreen>
    );

    const scrollView = UNSAFE_queryByType(ScrollView);
    expect(scrollView).toBeNull();
  });

  it('renders bottom actions when provided', () => {
    const { getByText } = renderWithTheme(
      <FormScreen title="Test" bottomActions={<Text>Submit</Text>}>
        <Text>Form content</Text>
      </FormScreen>
    );

    expect(getByText('Submit')).toBeTruthy();
  });

  it('renders error banner when error is provided', () => {
    const { getByText } = renderWithTheme(
      <FormScreen title="Test" error="Something went wrong">
        <Text>Form content</Text>
      </FormScreen>
    );

    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders back button when onBackPress is provided', () => {
    const onBackPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <FormScreen title="Test" onBackPress={onBackPress}>
        <Text>Content</Text>
      </FormScreen>
    );

    const backButton = getByLabelText('Go back');
    expect(backButton).toBeTruthy();
  });

  it('applies testID to the safe area container', () => {
    const { getByTestId } = renderWithTheme(
      <FormScreen title="Test" testID="form-screen">
        <Text>Content</Text>
      </FormScreen>
    );

    expect(getByTestId('form-screen')).toBeTruthy();
  });
});

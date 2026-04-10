import React from 'react';
import { Text, View } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Screen from '../Screen';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style, ...rest }: any) =>
      React.createElement(View, { ...rest, style, testID: rest.testID ?? 'safe-area-view' }, children),
  };
}, { virtual: true });

describe('Screen', () => {
  it('renders children with background color', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Screen testID="screen">
        <Text>Hello</Text>
      </Screen>
    );

    expect(getByText('Hello')).toBeTruthy();
    const screen = getByTestId('screen');
    const flatStyle = Array.isArray(screen.props.style)
      ? Object.assign({}, ...screen.props.style.filter(Boolean))
      : screen.props.style;
    expect(flatStyle.backgroundColor).toBe('#f8fafc');
  });

  it('wraps children in ScrollView when scroll is true', () => {
    const { getByText, UNSAFE_queryByType } = renderWithTheme(
      <Screen scroll>
        <Text>Scrollable content</Text>
      </Screen>
    );

    expect(getByText('Scrollable content')).toBeTruthy();
    const { ScrollView } = require('react-native');
    const scrollView = UNSAFE_queryByType(ScrollView);
    expect(scrollView).not.toBeNull();
  });

  it('wraps children in KeyboardAvoidingView when keyboardAware is true', () => {
    const { getByText, UNSAFE_queryByType } = renderWithTheme(
      <Screen keyboardAware>
        <Text>Keyboard content</Text>
      </Screen>
    );

    expect(getByText('Keyboard content')).toBeTruthy();
    const { KeyboardAvoidingView } = require('react-native');
    const kav = UNSAFE_queryByType(KeyboardAvoidingView);
    expect(kav).not.toBeNull();
    expect(kav!.props.style).toEqual({ flex: 1 });
  });

  it('passes contentContainerStyle to ScrollView when scroll is true', () => {
    const customStyle = { paddingHorizontal: 20 };
    const { UNSAFE_queryByType } = renderWithTheme(
      <Screen scroll contentContainerStyle={customStyle}>
        <Text>Content</Text>
      </Screen>
    );

    const { ScrollView } = require('react-native');
    const scrollView = UNSAFE_queryByType(ScrollView);
    expect(scrollView).not.toBeNull();
    expect(scrollView!.props.contentContainerStyle).toEqual(customStyle);
  });

  it('does not render ScrollView when scroll is not set', () => {
    const { UNSAFE_queryByType } = renderWithTheme(
      <Screen>
        <Text>No scroll</Text>
      </Screen>
    );

    const { ScrollView } = require('react-native');
    const scrollView = UNSAFE_queryByType(ScrollView);
    expect(scrollView).toBeNull();
  });

  it('applies flex: 1 to the container', () => {
    const { getByTestId } = renderWithTheme(
      <Screen testID="screen">
        <Text>Content</Text>
      </Screen>
    );

    const screen = getByTestId('screen');
    const flatStyle = Array.isArray(screen.props.style)
      ? Object.assign({}, ...screen.props.style.filter(Boolean))
      : screen.props.style;
    expect(flatStyle.flex).toBe(1);
  });
});

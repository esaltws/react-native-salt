import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import RetryView from '../RetryView';

describe('RetryView', () => {
  it('shows children when not loading and no error', () => {
    const { getByText } = renderWithTheme(
      <RetryView>
        <Text>Success Content</Text>
      </RetryView>
    );
    expect(getByText('Success Content')).toBeTruthy();
  });

  it('shows loader when loading is true', () => {
    const { queryByText } = renderWithTheme(
      <RetryView loading>
        <Text>Success Content</Text>
      </RetryView>
    );
    expect(queryByText('Success Content')).toBeNull();
  });

  it('shows error state when error is true', () => {
    const { getByText, queryByText } = renderWithTheme(
      <RetryView error>
        <Text>Success Content</Text>
      </RetryView>
    );
    expect(queryByText('Success Content')).toBeNull();
    // ErrorState renders the default title
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('shows error string as description when error is a string', () => {
    const { getByText } = renderWithTheme(
      <RetryView error="Network timeout">
        <Text>Success Content</Text>
      </RetryView>
    );
    expect(getByText('Network timeout')).toBeTruthy();
  });

  it('shows custom error title', () => {
    const { getByText } = renderWithTheme(
      <RetryView error errorTitle="Oops!">
        <Text>Content</Text>
      </RetryView>
    );
    expect(getByText('Oops!')).toBeTruthy();
  });

  it('applies testID when loading', () => {
    const { getByTestId } = renderWithTheme(
      <RetryView loading testID="retry-view">
        <Text>Content</Text>
      </RetryView>
    );
    expect(getByTestId('retry-view')).toBeTruthy();
  });
});

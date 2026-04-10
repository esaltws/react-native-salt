import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import SwipeableRow from '../SwipeableRow';

describe('SwipeableRow', () => {
  it('renders children content', () => {
    const { getByText } = renderWithTheme(
      <SwipeableRow>
        <Text>Row Content</Text>
      </SwipeableRow>
    );
    expect(getByText('Row Content')).toBeTruthy();
  });

  it('renders left actions when provided', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <SwipeableRow
        leftActions={[
          { key: 'archive', icon: 'archive-outline', label: 'Archive', color: '#22c55e', onPress },
        ]}
      >
        <Text>Content</Text>
      </SwipeableRow>
    );
    expect(getByLabelText('Archive')).toBeTruthy();
  });

  it('renders right actions when provided', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <SwipeableRow
        rightActions={[
          { key: 'delete', icon: 'trash-outline', label: 'Delete', color: '#ef4444', onPress },
        ]}
      >
        <Text>Content</Text>
      </SwipeableRow>
    );
    expect(getByLabelText('Delete')).toBeTruthy();
  });

  it('renders both left and right actions', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <SwipeableRow
        leftActions={[
          { key: 'pin', icon: 'pin-outline', label: 'Pin', color: '#3b82f6', onPress },
        ]}
        rightActions={[
          { key: 'delete', icon: 'trash-outline', label: 'Delete', color: '#ef4444', onPress },
        ]}
      >
        <Text>Content</Text>
      </SwipeableRow>
    );
    expect(getByLabelText('Pin')).toBeTruthy();
    expect(getByLabelText('Delete')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <SwipeableRow testID="swipeable">
        <Text>Content</Text>
      </SwipeableRow>
    );
    expect(getByTestId('swipeable')).toBeTruthy();
  });

  it('renders without actions by default', () => {
    const { getByText, toJSON } = renderWithTheme(
      <SwipeableRow>
        <Text>Simple Row</Text>
      </SwipeableRow>
    );
    expect(getByText('Simple Row')).toBeTruthy();
  });
});

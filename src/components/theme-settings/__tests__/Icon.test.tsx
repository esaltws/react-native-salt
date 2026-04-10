import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Icon from '../Icon';

// Mock the Ionicons component
jest.mock('@expo/vector-icons', () => ({
  Ionicons: (props: any) => {
    const { Text } = require('react-native');
    return <Text testID={props.testID} accessibilityLabel={props.accessibilityLabel}>{props.name}</Text>;
  },
}));

describe('Icon', () => {
  it('renders with a given name', () => {
    const { getByText } = renderWithTheme(
      <Icon name="heart-outline" />
    );
    // The Ionicons mock renders the name as text
    expect(getByText('heart-outline')).toBeTruthy();
  });

  it('maps alias "search" to "search-outline"', () => {
    const { getByText } = renderWithTheme(
      <Icon name="search" />
    );
    expect(getByText('search-outline')).toBeTruthy();
  });

  it('maps alias "close" to "close"', () => {
    const { getByText } = renderWithTheme(
      <Icon name="close" />
    );
    expect(getByText('close')).toBeTruthy();
  });

  it('maps alias "back" to "arrow-back"', () => {
    const { getByText } = renderWithTheme(
      <Icon name="back" />
    );
    expect(getByText('arrow-back')).toBeTruthy();
  });

  it('maps alias "check" to "checkmark"', () => {
    const { getByText } = renderWithTheme(
      <Icon name="check" />
    );
    expect(getByText('checkmark')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <Icon name="star" testID="icon-star" />
    );
    expect(getByTestId('icon-star')).toBeTruthy();
  });

  it('passes through non-alias names directly', () => {
    const { getByText } = renderWithTheme(
      <Icon name="rocket-outline" />
    );
    expect(getByText('rocket-outline')).toBeTruthy();
  });
});

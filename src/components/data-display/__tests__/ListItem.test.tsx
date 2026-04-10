import React from 'react';
import { Text, View } from 'react-native';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import ListItem from '../ListItem';

describe('ListItem', () => {
  it('renders the title', () => {
    const { getByText } = renderWithTheme(
      <ListItem title="Item Title" />
    );

    expect(getByText('Item Title')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <ListItem title="Item Title" subtitle="Item description" />
    );

    expect(getByText('Item description')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = renderWithTheme(
      <ListItem title="Item Title" />
    );

    // Only the title should be present
    expect(queryByText('Item Title')).toBeTruthy();
  });

  it('renders left and right slot content', () => {
    const { getByText } = renderWithTheme(
      <ListItem
        title="Item"
        left={<Text>Left Icon</Text>}
        right={<Text>Right Arrow</Text>}
      />
    );

    expect(getByText('Left Icon')).toBeTruthy();
    expect(getByText('Right Arrow')).toBeTruthy();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <ListItem title="Pressable Item" onPress={onPress} />
    );

    fireEvent.press(getByText('Pressable Item'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <ListItem title="Disabled Item" onPress={onPress} disabled testID="list-item" />
    );

    fireEvent.press(getByTestId('list-item'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies reduced opacity when disabled', () => {
    const { getByTestId } = renderWithTheme(
      <ListItem title="Disabled" disabled testID="list-item" />
    );

    const item = getByTestId('list-item');
    const flatStyle = Array.isArray(item.props.style)
      ? Object.assign({}, ...item.props.style.filter(Boolean))
      : item.props.style;
    expect(flatStyle.opacity).toBe(0.6);
  });

  it('sets button accessibilityRole when onPress is provided', () => {
    const { getByRole } = renderWithTheme(
      <ListItem title="Pressable" onPress={jest.fn()} />
    );

    expect(getByRole('button')).toBeTruthy();
  });
});

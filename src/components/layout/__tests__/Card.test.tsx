import React from 'react';
import { Text, Pressable, Image } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Card from '../Card';

describe('Card', () => {
  it('renders children on surface background', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Card testID="card">
        <Text>Card content</Text>
      </Card>
    );

    expect(getByText('Card content')).toBeTruthy();
    const card = getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.backgroundColor).toBe('#ffffff'); // colors.surface in light theme
  });

  it('applies border by default with elevation 0', () => {
    const { getByTestId } = renderWithTheme(
      <Card testID="card">
        <Text>Content</Text>
      </Card>
    );

    const card = getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.borderWidth).toBe(1);
    expect(flatStyle.borderColor).toBe('#e2e8f0'); // colors.border
  });

  it('removes border and applies shadow with elevation > 0', () => {
    const { getByTestId } = renderWithTheme(
      <Card testID="card" elevation={2}>
        <Text>Content</Text>
      </Card>
    );

    const card = getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.borderWidth).toBe(0);
    // Should have shadow properties (platform-specific; iOS uses shadowOpacity)
    expect(flatStyle.shadowOpacity).toBeDefined();
  });

  it('wraps in Pressable when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Card testID="card" onPress={onPress}>
        <Text>Pressable card</Text>
      </Card>
    );

    const card = getByTestId('card');
    fireEvent.press(card);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not wrap in Pressable when onPress is not provided', () => {
    const { UNSAFE_queryByType } = renderWithTheme(
      <Card testID="card">
        <Text>Static card</Text>
      </Card>
    );

    const pressable = UNSAFE_queryByType(Pressable);
    expect(pressable).toBeNull();
  });

  it('renders header section', () => {
    const { getByText } = renderWithTheme(
      <Card header={<Text>Header Content</Text>}>
        <Text>Body</Text>
      </Card>
    );

    expect(getByText('Header Content')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
  });

  it('renders footer section', () => {
    const { getByText } = renderWithTheme(
      <Card footer={<Text>Footer Content</Text>}>
        <Text>Body</Text>
      </Card>
    );

    expect(getByText('Footer Content')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
  });

  it('renders header image when image prop is provided', () => {
    const imageSource = { uri: 'https://example.com/image.png' };
    const { UNSAFE_queryByType } = renderWithTheme(
      <Card image={imageSource} imageHeight={200}>
        <Text>Content</Text>
      </Card>
    );

    const img = UNSAFE_queryByType(Image);
    expect(img).not.toBeNull();
    expect(img!.props.source).toEqual(imageSource);
    expect(img!.props.style.height).toBe(200);
    expect(img!.props.resizeMode).toBe('cover');
  });

  it('uses default imageHeight of 160', () => {
    const imageSource = { uri: 'https://example.com/image.png' };
    const { UNSAFE_queryByType } = renderWithTheme(
      <Card image={imageSource}>
        <Text>Content</Text>
      </Card>
    );

    const img = UNSAFE_queryByType(Image);
    expect(img).not.toBeNull();
    expect(img!.props.style.height).toBe(160);
  });

  it('applies borderRadius from theme radius.lg', () => {
    const { getByTestId } = renderWithTheme(
      <Card testID="card">
        <Text>Content</Text>
      </Card>
    );

    const card = getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.borderRadius).toBe(14); // radius.lg
  });
});

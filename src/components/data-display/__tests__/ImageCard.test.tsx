import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import ImageCard from '../ImageCard';

describe('ImageCard', () => {
  it('renders the title', () => {
    const { getByText } = renderWithTheme(
      <ImageCard imageUrl="https://example.com/img.jpg" title="Card Title" />
    );

    expect(getByText('Card Title')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <ImageCard
        imageUrl="https://example.com/img.jpg"
        title="Card Title"
        subtitle="Card Subtitle"
      />
    );

    expect(getByText('Card Subtitle')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = renderWithTheme(
      <ImageCard imageUrl="https://example.com/img.jpg" title="Card Title" />
    );

    expect(queryByText('Card Subtitle')).toBeNull();
  });

  it('renders with a null imageUrl without crashing', () => {
    const { getByText } = renderWithTheme(
      <ImageCard imageUrl={null} title="No Image" />
    );

    expect(getByText('No Image')).toBeTruthy();
  });

  it('renders badge when provided', () => {
    const { getByText } = renderWithTheme(
      <ImageCard
        imageUrl="https://example.com/img.jpg"
        title="Card"
        badge="NEW"
      />
    );

    expect(getByText('NEW')).toBeTruthy();
  });

  it('is pressable when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <ImageCard
        imageUrl="https://example.com/img.jpg"
        title="Pressable Card"
        onPress={onPress}
      />
    );

    fireEvent.press(getByText('Pressable Card'));
    expect(onPress).toHaveBeenCalled();
  });

  it('applies testID to the container', () => {
    const { getByTestId } = renderWithTheme(
      <ImageCard
        imageUrl="https://example.com/img.jpg"
        title="Card"
        testID="image-card"
      />
    );

    expect(getByTestId('image-card')).toBeTruthy();
  });
});

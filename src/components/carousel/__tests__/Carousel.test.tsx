import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Carousel from '../Carousel';

describe('Carousel', () => {
  const slides = [
    <Text key="1">Slide 1</Text>,
    <Text key="2">Slide 2</Text>,
    <Text key="3">Slide 3</Text>,
  ];

  it('renders all children slides', () => {
    const { getByText } = renderWithTheme(
      <Carousel>{slides}</Carousel>
    );
    expect(getByText('Slide 1')).toBeTruthy();
    expect(getByText('Slide 2')).toBeTruthy();
    expect(getByText('Slide 3')).toBeTruthy();
  });

  it('renders dot indicators when showDots is true and multiple children', () => {
    const { toJSON } = renderWithTheme(
      <Carousel showDots>{slides}</Carousel>
    );
    const tree = JSON.stringify(toJSON());
    // Each dot has borderRadius: dotSize/2 = 4 (default dotSize=8)
    const dotMatches = tree.match(/"borderRadius":4/g);
    expect(dotMatches).toBeTruthy();
    expect(dotMatches!.length).toBe(3);
  });

  it('does not render dots when showDots is false', () => {
    const { toJSON } = renderWithTheme(
      <Carousel showDots={false}>{slides}</Carousel>
    );
    const tree = JSON.stringify(toJSON());
    // Without dots, there should be no borderRadius:4 from dot elements
    const dotMatches = tree.match(/"borderRadius":4/g);
    expect(dotMatches).toBeNull();
  });

  it('does not render dots when there is only one child', () => {
    const { toJSON } = renderWithTheme(
      <Carousel showDots>{[<Text key="1">Only Slide</Text>]}</Carousel>
    );
    const tree = JSON.stringify(toJSON());
    const dotMatches = tree.match(/"borderRadius":4/g);
    expect(dotMatches).toBeNull();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <Carousel testID="carousel">{slides}</Carousel>
    );
    expect(getByTestId('carousel')).toBeTruthy();
  });

  it('renders without crashing with default props', () => {
    const { toJSON } = renderWithTheme(
      <Carousel>{slides}</Carousel>
    );
    expect(toJSON()).toBeTruthy();
  });
});

import React from 'react';
import { Animated } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import TypingIndicator from '../TypingIndicator';

describe('TypingIndicator', () => {
  it('renders the component with testID', () => {
    const { getByTestId } = renderWithTheme(
      <TypingIndicator testID="typing" />
    );
    expect(getByTestId('typing')).toBeTruthy();
  });

  it('renders exactly 3 animated dot views', () => {
    const { getByTestId } = renderWithTheme(
      <TypingIndicator testID="typing" />
    );
    const container = getByTestId('typing');
    // The container should have 3 Animated.View children (the dots)
    expect(container.children.length).toBe(3);
  });

  it('has flex-start alignment (aligns to the left like incoming messages)', () => {
    const { getByTestId } = renderWithTheme(
      <TypingIndicator testID="typing" />
    );
    const container = getByTestId('typing');
    const flatStyle = Object.assign(
      {},
      ...([].concat(container.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.alignSelf).toBe('flex-start');
  });

  it('applies border and surface background to mimic a chat bubble', () => {
    const { getByTestId } = renderWithTheme(
      <TypingIndicator testID="typing" />
    );
    const container = getByTestId('typing');
    const flatStyle = Object.assign(
      {},
      ...([].concat(container.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.borderWidth).toBe(1);
    expect(flatStyle.backgroundColor).toBeDefined();
  });
});

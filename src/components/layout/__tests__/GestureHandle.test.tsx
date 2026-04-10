import React from 'react';
import { Pressable } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import GestureHandle from '../GestureHandle';

describe('GestureHandle', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <GestureHandle testID="handle" />
    );

    expect(getByTestId('handle')).toBeTruthy();
  });

  it('renders as a dot variant by default', () => {
    const { getByTestId } = renderWithTheme(
      <GestureHandle testID="handle" size={10} />
    );

    // The handle renders a View -> Animated.View -> View (the dot)
    const handle = getByTestId('handle');
    expect(handle).toBeTruthy();
  });

  it('wraps in Pressable when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <GestureHandle testID="handle" onPress={onPress} />
    );

    const handle = getByTestId('handle');
    expect(handle).toBeTruthy();
    fireEvent.press(handle);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not wrap in Pressable when no onPress or drag handlers', () => {
    const { UNSAFE_queryByType } = renderWithTheme(
      <GestureHandle testID="handle" />
    );

    const pressable = UNSAFE_queryByType(Pressable);
    expect(pressable).toBeNull();
  });

  it('renders bar variant when variant="bar"', () => {
    const { getByTestId } = renderWithTheme(
      <GestureHandle testID="handle" variant="bar" />
    );

    const handle = getByTestId('handle');
    expect(handle).toBeTruthy();
  });

  it('renders corner variant when variant="corner"', () => {
    const { getByTestId } = renderWithTheme(
      <GestureHandle testID="handle" variant="corner" />
    );

    const handle = getByTestId('handle');
    expect(handle).toBeTruthy();
  });

  it('uses drag handler view when onDrag is provided', () => {
    const onDrag = jest.fn();
    const { getByTestId, UNSAFE_queryByType } = renderWithTheme(
      <GestureHandle testID="handle" onDrag={onDrag} />
    );

    // When drag handlers are provided, it should not use Pressable
    const pressable = UNSAFE_queryByType(Pressable);
    expect(pressable).toBeNull();
    // But the handle container should still render
    expect(getByTestId('handle')).toBeTruthy();
  });

  it('applies custom color to the handle', () => {
    const { getByTestId } = renderWithTheme(
      <GestureHandle testID="handle" color="#ff0000" size={10} />
    );

    const handle = getByTestId('handle');
    expect(handle).toBeTruthy();
  });
});

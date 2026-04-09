import React from 'react';
import { Text, View } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Stack from '../Stack';

describe('Stack', () => {
  it('renders children vertically by default', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Stack testID="stack">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Stack>
    );

    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    const stack = getByTestId('stack');
    const flatStyle = Array.isArray(stack.props.style)
      ? Object.assign({}, ...stack.props.style.filter(Boolean))
      : stack.props.style;
    expect(flatStyle.flexDirection).toBe('column');
  });

  it('renders children horizontally when direction="horizontal"', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" direction="horizontal">
        <Text>A</Text>
        <Text>B</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const flatStyle = Array.isArray(stack.props.style)
      ? Object.assign({}, ...stack.props.style.filter(Boolean))
      : stack.props.style;
    expect(flatStyle.flexDirection).toBe('row');
  });

  it('resolves spacing token for gap', () => {
    // gap="lg" should resolve to 16 (theme.spacing.lg)
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" gap="lg">
        <Text>A</Text>
        <Text>B</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    // Stack applies gap via marginBottom on items (vertical).
    // Check the first item wrapper has marginBottom = 16.
    const items = stack.children as any[];
    // Items are Views wrapping children; first item should have marginBottom = 16
    const firstItemView = items[0];
    const firstStyle = firstItemView.props.style;
    expect(firstStyle.marginBottom).toBe(16);
  });

  it('resolves raw number for gap', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" gap={24}>
        <Text>A</Text>
        <Text>B</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const items = stack.children as any[];
    const firstItemView = items[0];
    expect(firstItemView.props.style.marginBottom).toBe(24);
  });

  it('renders divider separators between children when divider={true}', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" divider>
        <Text>A</Text>
        <Text>B</Text>
        <Text>C</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const children = stack.children as any[];
    // With 3 items and divider, expect: item-0, div-1, item-1, div-2, item-2 = 5 elements
    expect(children.length).toBe(5);
    // Divider elements (indices 1, 3) should have height: 1 (vertical mode)
    const divider1 = children[1];
    expect(divider1.props.style.height).toBe(1);
    expect(divider1.props.style.backgroundColor).toBe('#e2e8f0'); // theme.colors.border
  });

  it('enables flexWrap when wrap is true', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" wrap>
        <Text>A</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const flatStyle = Array.isArray(stack.props.style)
      ? Object.assign({}, ...stack.props.style.filter(Boolean))
      : stack.props.style;
    expect(flatStyle.flexWrap).toBe('wrap');
  });

  it('does not enable flexWrap when wrap is false', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack">
        <Text>A</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const flatStyle = Array.isArray(stack.props.style)
      ? Object.assign({}, ...stack.props.style.filter(Boolean))
      : stack.props.style;
    expect(flatStyle.flexWrap).toBe('nowrap');
  });

  it('applies align and justify flex properties', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" align="center" justify="space-between">
        <Text>A</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const flatStyle = Array.isArray(stack.props.style)
      ? Object.assign({}, ...stack.props.style.filter(Boolean))
      : stack.props.style;
    expect(flatStyle.alignItems).toBe('center');
    expect(flatStyle.justifyContent).toBe('space-between');
  });

  it('uses default align="stretch" and justify="flex-start"', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack">
        <Text>A</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const flatStyle = Array.isArray(stack.props.style)
      ? Object.assign({}, ...stack.props.style.filter(Boolean))
      : stack.props.style;
    expect(flatStyle.alignItems).toBe('stretch');
    expect(flatStyle.justifyContent).toBe('flex-start');
  });

  it('last item has zero margin', () => {
    const { getByTestId } = renderWithTheme(
      <Stack testID="stack" gap="md">
        <Text>A</Text>
        <Text>B</Text>
      </Stack>
    );

    const stack = getByTestId('stack');
    const items = stack.children as any[];
    const lastItemView = items[items.length - 1];
    expect(lastItemView.props.style.marginBottom).toBe(0);
  });
});

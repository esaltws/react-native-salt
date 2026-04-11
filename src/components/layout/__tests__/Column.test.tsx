import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Column from '../Column';

describe('Column', () => {
  it('renders children in column direction', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Column testID="column">
        <Text>Top</Text>
        <Text>Bottom</Text>
      </Column>
    );

    expect(getByText('Top')).toBeTruthy();
    expect(getByText('Bottom')).toBeTruthy();
    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.flexDirection).toBe('column');
  });

  it('resolves spacing token for gap', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column" gap="xl">
        <Text>A</Text>
        <Text>B</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.gap).toBe(24); // theme.spacing.xl
  });

  it('resolves raw number for gap', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column" gap={'xxl'}>
        <Text>A</Text>
        <Text>B</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.gap).toBe(32);
  });

  it('applies flex: 1 when fill is true', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column" fill>
        <Text>A</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.flex).toBe(1);
  });

  it('does not apply flex when fill is false', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column">
        <Text>A</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.flex).toBeUndefined();
  });

  it('defaults alignment to stretch', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column">
        <Text>A</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.alignItems).toBe('stretch');
  });

  it('applies custom align and justify', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column" align="center" justify="space-around">
        <Text>A</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.alignItems).toBe('center');
    expect(flatStyle.justifyContent).toBe('space-around');
  });

  it('enables flexWrap when wrap is true', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column" wrap>
        <Text>A</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.flexWrap).toBe('wrap');
  });

  it('defaults gap to 0', () => {
    const { getByTestId } = renderWithTheme(
      <Column testID="column">
        <Text>A</Text>
      </Column>
    );

    const column = getByTestId('column');
    const flatStyle = Array.isArray(column.props.style)
      ? Object.assign({}, ...column.props.style.filter(Boolean))
      : column.props.style;
    expect(flatStyle.gap).toBe(0);
  });
});

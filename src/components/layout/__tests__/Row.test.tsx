import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Row from '../Row';

describe('Row', () => {
  it('renders children in row direction', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Row testID="row">
        <Text>Left</Text>
        <Text>Right</Text>
      </Row>
    );

    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.flexDirection).toBe('row');
  });

  it('resolves spacing token for gap', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row" gap="lg">
        <Text>A</Text>
        <Text>B</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.gap).toBe(16); // theme.spacing.lg
  });

  it('resolves spacing token xl for gap', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row" gap="xl">
        <Text>A</Text>
        <Text>B</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.gap).toBe(24); // theme.spacing.xl
  });

  it('applies flex: 1 when fill is true', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row" fill>
        <Text>A</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.flex).toBe(1);
  });

  it('does not apply flex when fill is false', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row">
        <Text>A</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.flex).toBeUndefined();
  });

  it('defaults alignment to center', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row">
        <Text>A</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.alignItems).toBe('center');
  });

  it('applies custom align and justify', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row" align="flex-start" justify="space-between">
        <Text>A</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.alignItems).toBe('flex-start');
    expect(flatStyle.justifyContent).toBe('space-between');
  });

  it('enables flexWrap when wrap is true', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row" wrap>
        <Text>A</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.flexWrap).toBe('wrap');
  });

  it('defaults gap to 0', () => {
    const { getByTestId } = renderWithTheme(
      <Row testID="row">
        <Text>A</Text>
      </Row>
    );

    const row = getByTestId('row');
    const flatStyle = Array.isArray(row.props.style)
      ? Object.assign({}, ...row.props.style.filter(Boolean))
      : row.props.style;
    expect(flatStyle.gap).toBe(0);
  });
});

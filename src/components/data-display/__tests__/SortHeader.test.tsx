import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import SortHeader from '../SortHeader';

describe('SortHeader', () => {
  it('renders the label text', () => {
    const { getByText } = renderWithTheme(
      <SortHeader label="Name" onPress={jest.fn()} />
    );

    expect(getByText('Name')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <SortHeader label="Name" onPress={onPress} />
    );

    fireEvent.press(getByText('Name'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders without crashing when direction is asc', () => {
    const { getByText } = renderWithTheme(
      <SortHeader label="Name" onPress={jest.fn()} active direction="asc" />
    );

    expect(getByText('Name')).toBeTruthy();
  });

  it('renders without crashing when direction is desc', () => {
    const { getByText } = renderWithTheme(
      <SortHeader label="Price" onPress={jest.fn()} active direction="desc" />
    );

    expect(getByText('Price')).toBeTruthy();
  });

  it('renders without crashing when direction is null (default)', () => {
    const { getByText } = renderWithTheme(
      <SortHeader label="Date" onPress={jest.fn()} />
    );

    expect(getByText('Date')).toBeTruthy();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <SortHeader label="Col" onPress={jest.fn()} testID="sort-header" />
    );

    expect(getByTestId('sort-header')).toBeTruthy();
  });
});

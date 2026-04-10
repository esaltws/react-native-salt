import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <SearchBar value="" onChangeText={jest.fn()} />
    );
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('calls onChangeText on input', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <SearchBar value="" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText('Search...'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });

  it('shows clear button when value is non-empty', () => {
    const { getByLabelText } = renderWithTheme(
      <SearchBar value="test" onChangeText={jest.fn()} />
    );
    expect(getByLabelText('Clear search')).toBeTruthy();
  });

  it('hides clear button when value is empty', () => {
    const { queryByLabelText } = renderWithTheme(
      <SearchBar value="" onChangeText={jest.fn()} />
    );
    expect(queryByLabelText('Clear search')).toBeNull();
  });

  it('calls onClear when clear button is pressed', () => {
    const onClear = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <SearchBar value="test" onChangeText={jest.fn()} onClear={onClear} />
    );
    fireEvent.press(getByLabelText('Clear search'));
    expect(onClear).toHaveBeenCalled();
  });

  it('clears text via onChangeText when no onClear provided', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <SearchBar value="test" onChangeText={onChangeText} />
    );
    fireEvent.press(getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });
});

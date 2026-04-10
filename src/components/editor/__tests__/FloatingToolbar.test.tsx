import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import FloatingToolbar from '../FloatingToolbar';

const items = [
  { key: 'bold', icon: 'text-outline', label: 'Bold' },
  { key: 'italic', icon: 'text-outline', label: 'Italic' },
  { key: 'underline', icon: 'text-outline', label: 'Underline' },
  { key: 'disabled', icon: 'text-outline', label: 'Strikethrough', disabled: true },
];

describe('FloatingToolbar', () => {
  const onSelect = jest.fn();

  beforeEach(() => {
    onSelect.mockClear();
  });

  it('renders all toolbar items with labels', () => {
    const { getByText } = renderWithTheme(
      <FloatingToolbar items={items} onSelect={onSelect} />
    );
    expect(getByText('Bold')).toBeTruthy();
    expect(getByText('Italic')).toBeTruthy();
    expect(getByText('Underline')).toBeTruthy();
  });

  it('calls onSelect with the correct key when an item is pressed', () => {
    const { getByText } = renderWithTheme(
      <FloatingToolbar items={items} onSelect={onSelect} />
    );
    fireEvent.press(getByText('Italic'));
    expect(onSelect).toHaveBeenCalledWith('italic');
  });

  it('does not call onSelect for disabled items', () => {
    const { getByText } = renderWithTheme(
      <FloatingToolbar items={items} onSelect={onSelect} />
    );
    fireEvent.press(getByText('Strikethrough'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders without labels when items have no label', () => {
    const noLabelItems = [
      { key: 'a', icon: 'text-outline' },
      { key: 'b', icon: 'text-outline' },
    ];
    const { queryByText } = renderWithTheme(
      <FloatingToolbar items={noLabelItems} onSelect={onSelect} />
    );
    expect(queryByText('Bold')).toBeNull();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <FloatingToolbar items={items} onSelect={onSelect} testID="toolbar" />
    );
    expect(getByTestId('toolbar')).toBeTruthy();
  });

  it('renders all items including disabled ones', () => {
    const { getByText } = renderWithTheme(
      <FloatingToolbar items={items} onSelect={onSelect} />
    );
    expect(getByText('Strikethrough')).toBeTruthy();
  });
});

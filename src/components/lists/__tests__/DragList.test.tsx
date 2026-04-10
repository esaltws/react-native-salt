import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import DragList from '../DragList';

const items = [
  { key: '1', label: 'Item One' },
  { key: '2', label: 'Item Two' },
  { key: '3', label: 'Item Three' },
];

describe('DragList', () => {
  const onReorder = jest.fn();

  beforeEach(() => {
    onReorder.mockClear();
  });

  it('renders all item labels', () => {
    const { getByText } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} />
    );
    expect(getByText('Item One')).toBeTruthy();
    expect(getByText('Item Two')).toBeTruthy();
    expect(getByText('Item Three')).toBeTruthy();
  });

  it('has up and down arrow buttons for each item', () => {
    const { getByLabelText } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} />
    );
    expect(getByLabelText('Move Item Two up')).toBeTruthy();
    expect(getByLabelText('Move Item Two down')).toBeTruthy();
  });

  it('disables up button for the first item', () => {
    const { getByLabelText } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} />
    );
    const upButton = getByLabelText('Move Item One up');
    expect(upButton.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('disables down button for the last item', () => {
    const { getByLabelText } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} />
    );
    const downButton = getByLabelText('Move Item Three down');
    expect(downButton.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('calls onReorder when moving an item down', () => {
    const { getByLabelText } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} />
    );
    fireEvent.press(getByLabelText('Move Item One down'));
    expect(onReorder).toHaveBeenCalledTimes(1);
    const reordered = onReorder.mock.calls[0][0];
    expect(reordered[0].key).toBe('2');
    expect(reordered[1].key).toBe('1');
  });

  it('calls onReorder when moving an item up', () => {
    const { getByLabelText } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} />
    );
    fireEvent.press(getByLabelText('Move Item Three up'));
    expect(onReorder).toHaveBeenCalledTimes(1);
    const reordered = onReorder.mock.calls[0][0];
    expect(reordered[1].key).toBe('3');
    expect(reordered[2].key).toBe('2');
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <DragList items={items} onReorder={onReorder} testID="drag-list" />
    );
    expect(getByTestId('drag-list')).toBeTruthy();
  });
});

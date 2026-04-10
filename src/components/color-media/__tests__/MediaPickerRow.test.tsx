import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import MediaPickerRow from '../MediaPickerRow';

const items = [
  { id: '1', uri: 'https://example.com/a.jpg' },
  { id: '2', uri: 'https://example.com/b.jpg' },
];

describe('MediaPickerRow', () => {
  it('renders the add button when items are below maxItems', () => {
    const { getByText } = renderWithTheme(
      <MediaPickerRow items={[]} onAdd={jest.fn()} />
    );
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls onAdd when the add button is pressed', () => {
    const onAdd = jest.fn();
    const { getByText } = renderWithTheme(
      <MediaPickerRow items={[]} onAdd={onAdd} />
    );
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('does not render add button when maxItems is reached', () => {
    const { queryByText } = renderWithTheme(
      <MediaPickerRow items={items} maxItems={2} onAdd={jest.fn()} />
    );
    expect(queryByText('Add')).toBeNull();
  });

  it('renders the label with item count', () => {
    const { getByText } = renderWithTheme(
      <MediaPickerRow items={items} label="Photos" maxItems={5} />
    );
    expect(getByText('Photos')).toBeTruthy();
    expect(getByText(' (2/5)')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <MediaPickerRow items={items} testID="media-row" />
    );
    expect(getByTestId('media-row')).toBeTruthy();
  });

  it('does not show add button when disabled', () => {
    const { queryByText } = renderWithTheme(
      <MediaPickerRow items={[]} onAdd={jest.fn()} disabled />
    );
    expect(queryByText('Add')).toBeNull();
  });
});

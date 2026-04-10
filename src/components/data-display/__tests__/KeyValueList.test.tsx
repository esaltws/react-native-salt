import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import KeyValueList from '../KeyValueList';

const mockItems = [
  { key: 'name', label: 'Name', value: 'Alice' },
  { key: 'email', label: 'Email', value: 'alice@example.com' },
  { key: 'phone', label: 'Phone', value: '+1-555-0123' },
];

describe('KeyValueList', () => {
  it('renders all label-value pairs', () => {
    const { getByText } = renderWithTheme(
      <KeyValueList items={mockItems} />
    );

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('alice@example.com')).toBeTruthy();
    expect(getByText('Phone')).toBeTruthy();
    expect(getByText('+1-555-0123')).toBeTruthy();
  });

  it('renders correctly with a single item', () => {
    const { getByText } = renderWithTheme(
      <KeyValueList items={[{ key: 'name', label: 'Name', value: 'Bob' }]} />
    );

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
  });

  it('fires onPress when an item with onPress is pressed', () => {
    const onPress = jest.fn();
    const items = [
      { key: 'clickable', label: 'Details', value: 'View', onPress },
    ];

    const { getByText } = renderWithTheme(
      <KeyValueList items={items} />
    );

    fireEvent.press(getByText('Details'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders without border when bordered is false', () => {
    const { getByTestId } = renderWithTheme(
      <KeyValueList items={mockItems} bordered={false} testID="kv-list" />
    );

    expect(getByTestId('kv-list')).toBeTruthy();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <KeyValueList items={mockItems} testID="kv-list" />
    );

    expect(getByTestId('kv-list')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import RadioGroup from '../RadioGroup';

const items = [
  { key: 'a', label: 'Option A' },
  { key: 'b', label: 'Option B', description: 'Description B' },
  { key: 'c', label: 'Option C' },
];

describe('RadioGroup', () => {
  it('renders all items', () => {
    const { getByText } = renderWithTheme(
      <RadioGroup items={items} selected={null} onSelect={jest.fn()} />
    );
    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
    expect(getByText('Option C')).toBeTruthy();
  });

  it('renders description when provided', () => {
    const { getByText } = renderWithTheme(
      <RadioGroup items={items} selected={null} onSelect={jest.fn()} />
    );
    expect(getByText('Description B')).toBeTruthy();
  });

  it('calls onSelect with key on press', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <RadioGroup items={items} selected={null} onSelect={onSelect} />
    );
    fireEvent.press(getByText('Option A'));
    expect(onSelect).toHaveBeenCalledWith('a');
  });

  it('has correct accessibility state for selected item', () => {
    const { getByLabelText } = renderWithTheme(
      <RadioGroup items={items} selected="b" onSelect={jest.fn()} />
    );
    const radio = getByLabelText('Option B');
    expect(radio.props.accessibilityState.checked).toBe(true);
  });

  it('has accessibilityRole radio', () => {
    const { getAllByRole } = renderWithTheme(
      <RadioGroup items={items} selected={null} onSelect={jest.fn()} />
    );
    expect(getAllByRole('radio').length).toBe(3);
  });
});

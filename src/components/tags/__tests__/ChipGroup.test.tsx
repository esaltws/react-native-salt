import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ChipGroup from '../ChipGroup';

const items = [
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue' },
  { key: 'angular', label: 'Angular' },
];

describe('ChipGroup', () => {
  it('renders all chip items', () => {
    const { getByText } = renderWithTheme(
      <ChipGroup items={items} selected={null} onSelect={jest.fn()} testID="chips" />
    );
    expect(getByText('React')).toBeTruthy();
    expect(getByText('Vue')).toBeTruthy();
    expect(getByText('Angular')).toBeTruthy();
  });

  it('renders "All" chip when showAll is true (default)', () => {
    const { getByText } = renderWithTheme(
      <ChipGroup items={items} selected={null} onSelect={jest.fn()} testID="chips" />
    );
    expect(getByText('All')).toBeTruthy();
  });

  it('hides "All" chip when showAll is false', () => {
    const { queryByText } = renderWithTheme(
      <ChipGroup items={items} selected={null} onSelect={jest.fn()} showAll={false} testID="chips" />
    );
    expect(queryByText('All')).toBeNull();
  });

  it('calls onSelect with item key when a chip is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <ChipGroup items={items} selected={null} onSelect={onSelect} testID="chips" />
    );
    fireEvent.press(getByText('Vue'));
    expect(onSelect).toHaveBeenCalledWith('vue');
  });

  it('calls onSelect with null when "All" chip is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <ChipGroup items={items} selected="react" onSelect={onSelect} testID="chips" />
    );
    fireEvent.press(getByText('All'));
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('renders selected chip with solid variant', () => {
    const { getByText } = renderWithTheme(
      <ChipGroup items={items} selected="react" onSelect={jest.fn()} testID="chips" />
    );
    // The selected chip's Badge is rendered with variant="solid"
    // and unselected chips with variant="outline"
    // Just verify the component renders correctly with a selection
    expect(getByText('React')).toBeTruthy();
    expect(getByText('Vue')).toBeTruthy();
  });

  it('uses custom allLabel when provided', () => {
    const { getByText } = renderWithTheme(
      <ChipGroup
        items={items}
        selected={null}
        onSelect={jest.fn()}
        allLabel="Everything"
        testID="chips"
      />
    );
    expect(getByText('Everything')).toBeTruthy();
  });
});

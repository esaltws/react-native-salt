import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Select from '../Select';

const options = [
  { key: 'a', label: 'Apple' },
  { key: 'b', label: 'Banana' },
  { key: 'c', label: 'Cherry', disabled: true },
];

describe('Select', () => {
  it('renders placeholder when no value', () => {
    const { getByText } = renderWithTheme(
      <Select options={options} value={null} onChange={jest.fn()} />
    );
    expect(getByText('Select an option')).toBeTruthy();
  });

  it('renders selected value label', () => {
    const { getByText } = renderWithTheme(
      <Select options={options} value="a" onChange={jest.fn()} />
    );
    expect(getByText('Apple')).toBeTruthy();
  });

  it('opens modal on press', () => {
    const { getByRole } = renderWithTheme(
      <Select options={options} value={null} onChange={jest.fn()} />
    );
    fireEvent.press(getByRole('button'));
  });

  it('shows label when provided', () => {
    const { getByText } = renderWithTheme(
      <Select options={options} value={null} onChange={jest.fn()} label="Fruit" />
    );
    expect(getByText('Fruit')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <Select options={options} value={null} onChange={jest.fn()} error="Required" />
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('does not open when disabled', () => {
    const { getByRole } = renderWithTheme(
      <Select options={options} value={null} onChange={jest.fn()} disabled />
    );
    const trigger = getByRole('button');
    expect(trigger.props.accessibilityState.disabled).toBe(true);
  });
});

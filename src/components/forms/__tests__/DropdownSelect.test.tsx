import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import DropdownSelect from '../DropdownSelect';

const options = [
  { key: 'a', label: 'Apple' },
  { key: 'b', label: 'Banana' },
  { key: 'c', label: 'Cherry' },
];

describe('DropdownSelect', () => {
  it('renders placeholder when no value', () => {
    const { getByText } = renderWithTheme(
      <DropdownSelect options={options} value={null} onChange={jest.fn()} />
    );
    expect(getByText('Select...')).toBeTruthy();
  });

  it('renders selected value label', () => {
    const { getByText } = renderWithTheme(
      <DropdownSelect options={options} value="b" onChange={jest.fn()} />
    );
    expect(getByText('Banana')).toBeTruthy();
  });

  it('opens dropdown on press', () => {
    const { getByRole, getByText } = renderWithTheme(
      <DropdownSelect options={options} value={null} onChange={jest.fn()} />
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
  });

  it('calls onChange on option select', () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = renderWithTheme(
      <DropdownSelect options={options} value={null} onChange={onChange} />
    );
    fireEvent.press(getByRole('button'));
    fireEvent.press(getByText('Cherry'));
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <DropdownSelect options={options} value={null} onChange={jest.fn()} error="Required" />
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('shows label', () => {
    const { getByText } = renderWithTheme(
      <DropdownSelect options={options} value={null} onChange={jest.fn()} label="Fruit" />
    );
    expect(getByText('Fruit')).toBeTruthy();
  });
});

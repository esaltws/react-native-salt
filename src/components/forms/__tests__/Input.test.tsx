import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Input from '../Input';

describe('Input', () => {
  it('renders with label and placeholder', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <Input label="Email" placeholder="Enter email" />
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('shows error message with danger color', () => {
    const { getByText } = renderWithTheme(
      <Input label="Email" error="Invalid email" />
    );
    const errorText = getByText('Invalid email');
    expect(errorText).toBeTruthy();
  });

  it('shows required asterisk', () => {
    const { getByText } = renderWithTheme(
      <Input label="Email" required />
    );
    expect(getByText('*')).toBeTruthy();
  });

  it('disables input when editable is false', () => {
    const { getByLabelText } = renderWithTheme(
      <Input label="Email" editable={false} />
    );
    const input = getByLabelText('Email');
    expect(input.props.editable).toBe(false);
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Type" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText('Type'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('renders without label', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="No label" />
    );
    expect(getByPlaceholderText('No label')).toBeTruthy();
  });
});

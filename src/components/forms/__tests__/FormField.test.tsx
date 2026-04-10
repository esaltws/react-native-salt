import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import FormField from '../FormField';

describe('FormField', () => {
  it('renders input mode by default', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <FormField label="Name" placeholder="Enter name" />
    );
    expect(getByPlaceholderText('Enter name')).toBeTruthy();
  });

  it('renders custom mode with children', () => {
    const { getByText } = renderWithTheme(
      <FormField mode="custom" label="Custom">
        <Text>Custom content</Text>
      </FormField>
    );
    expect(getByText('Custom')).toBeTruthy();
    expect(getByText('Custom content')).toBeTruthy();
  });

  it('shows required asterisk in custom mode', () => {
    const { getByText } = renderWithTheme(
      <FormField mode="custom" label="Email" required>
        <Text>Input</Text>
      </FormField>
    );
    expect(getByText('*')).toBeTruthy();
  });

  it('shows helper text in custom mode', () => {
    const { getByText } = renderWithTheme(
      <FormField mode="custom" label="Name" helperText="Enter your full name">
        <Text>Input</Text>
      </FormField>
    );
    expect(getByText('Enter your full name')).toBeTruthy();
  });

  it('shows error in custom mode', () => {
    const { getByText } = renderWithTheme(
      <FormField mode="custom" label="Name" error="Required">
        <Text>Input</Text>
      </FormField>
    );
    expect(getByText('Required')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('renders with label', () => {
    const { getByText } = renderWithTheme(
      <TextArea label="Bio" />
    );
    expect(getByText('Bio')).toBeTruthy();
  });

  it('is multiline', () => {
    const { getByLabelText } = renderWithTheme(
      <TextArea label="Notes" />
    );
    expect(getByLabelText('Notes').props.multiline).toBe(true);
  });

  it('shows character count when showCount and maxLength', () => {
    const { getByText } = renderWithTheme(
      <TextArea value="Hello" showCount maxLength={100} />
    );
    expect(getByText('5/100')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = renderWithTheme(
      <TextArea error="Too long" />
    );
    expect(getByText('Too long')).toBeTruthy();
  });

  it('shows required asterisk', () => {
    const { getByText } = renderWithTheme(
      <TextArea label="Bio" required />
    );
    expect(getByText('*')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TextArea label="Notes" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByLabelText('Notes'), 'new text');
    expect(onChangeText).toHaveBeenCalledWith('new text');
  });
});

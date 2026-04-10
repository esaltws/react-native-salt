import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import TagInput from '../TagInput';

describe('TagInput', () => {
  it('renders existing tags', () => {
    const { getByText } = renderWithTheme(
      <TagInput tags={['React', 'Vue']} onChangeTags={jest.fn()} testID="taginput" />
    );
    expect(getByText('React')).toBeTruthy();
    expect(getByText('Vue')).toBeTruthy();
  });

  it('adds a tag on submit', () => {
    const onChangeTags = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TagInput tags={[]} onChangeTags={onChangeTags} testID="taginput" />
    );
    const input = getByLabelText('Add tag');
    fireEvent.changeText(input, 'NewTag');
    fireEvent(input, 'submitEditing');
    expect(onChangeTags).toHaveBeenCalledWith(['NewTag']);
  });

  it('prevents adding duplicate tags', () => {
    const onChangeTags = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TagInput tags={['React']} onChangeTags={onChangeTags} testID="taginput" />
    );
    const input = getByLabelText('Add tag');
    fireEvent.changeText(input, 'React');
    fireEvent(input, 'submitEditing');
    expect(onChangeTags).not.toHaveBeenCalled();
  });

  it('respects maxTags limit and hides input when at limit', () => {
    const onChangeTags = jest.fn();
    const { queryByLabelText, getByText } = renderWithTheme(
      <TagInput tags={['A', 'B']} onChangeTags={onChangeTags} maxTags={2} testID="taginput" />
    );
    // Input should not be rendered when at limit
    expect(queryByLabelText('Add tag')).toBeNull();
    // Counter should show 2/2
    expect(getByText('2/2')).toBeTruthy();
  });

  it('removes a tag when remove button is pressed', () => {
    const onChangeTags = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TagInput tags={['React', 'Vue']} onChangeTags={onChangeTags} testID="taginput" />
    );
    fireEvent.press(getByLabelText('Remove React'));
    expect(onChangeTags).toHaveBeenCalledWith(['Vue']);
  });

  it('displays error text when error prop is provided', () => {
    const { getByText } = renderWithTheme(
      <TagInput tags={[]} onChangeTags={jest.fn()} error="Too many tags" testID="taginput" />
    );
    expect(getByText('Too many tags')).toBeTruthy();
  });

  it('shows filtered suggestions when text matches', () => {
    const { getByLabelText, getByText } = renderWithTheme(
      <TagInput
        tags={[]}
        onChangeTags={jest.fn()}
        suggestions={['React', 'Redux', 'Remix']}
        testID="taginput"
      />
    );
    const input = getByLabelText('Add tag');
    fireEvent.changeText(input, 'Re');
    // Suggestions matching "Re" should appear
    expect(getByText('React')).toBeTruthy();
    expect(getByText('Redux')).toBeTruthy();
    expect(getByText('Remix')).toBeTruthy();
  });

  it('renders label when provided', () => {
    const { getByText } = renderWithTheme(
      <TagInput tags={[]} onChangeTags={jest.fn()} label="Skills" testID="taginput" />
    );
    expect(getByText('Skills')).toBeTruthy();
  });
});

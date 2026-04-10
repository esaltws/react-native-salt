import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import TagList from '../TagList';

const sampleTags = [
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue' },
  { key: 'angular', label: 'Angular' },
];

describe('TagList', () => {
  it('renders all tag labels', () => {
    const { getByText } = renderWithTheme(
      <TagList tags={sampleTags} testID="taglist" />
    );
    expect(getByText('React')).toBeTruthy();
    expect(getByText('Vue')).toBeTruthy();
    expect(getByText('Angular')).toBeTruthy();
  });

  it('renders remove buttons when onRemove is provided', () => {
    const { getByLabelText } = renderWithTheme(
      <TagList tags={sampleTags} onRemove={jest.fn()} testID="taglist" />
    );
    expect(getByLabelText('Remove React')).toBeTruthy();
    expect(getByLabelText('Remove Vue')).toBeTruthy();
    expect(getByLabelText('Remove Angular')).toBeTruthy();
  });

  it('calls onRemove with the correct key when remove is pressed', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TagList tags={sampleTags} onRemove={onRemove} testID="taglist" />
    );
    fireEvent.press(getByLabelText('Remove Vue'));
    expect(onRemove).toHaveBeenCalledWith('vue');
  });

  it('does not render remove buttons when onRemove is not provided', () => {
    const { queryByLabelText } = renderWithTheme(
      <TagList tags={sampleTags} testID="taglist" />
    );
    expect(queryByLabelText('Remove React')).toBeNull();
  });

  it('renders Add button when onAdd is provided', () => {
    const onAdd = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TagList tags={sampleTags} onAdd={onAdd} testID="taglist" />
    );
    const addBtn = getByLabelText('Add');
    expect(addBtn).toBeTruthy();
    fireEvent.press(addBtn);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('calls onPress with the tag key when a tag is pressed', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <TagList tags={sampleTags} onPress={onPress} testID="taglist" />
    );
    fireEvent.press(getByLabelText('React'));
    expect(onPress).toHaveBeenCalledWith('react');
  });

  it('uses custom addLabel for the add button', () => {
    const { getByText } = renderWithTheme(
      <TagList tags={sampleTags} onAdd={jest.fn()} addLabel="New Tag" testID="taglist" />
    );
    expect(getByText('New Tag')).toBeTruthy();
  });
});

import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import BottomSheet from '../BottomSheet';

describe('BottomSheet', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders children when visible is true', () => {
    const { getByText } = renderWithTheme(
      <BottomSheet visible onClose={onClose}>
        <Text>Sheet Content</Text>
      </BottomSheet>
    );
    expect(getByText('Sheet Content')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const { queryByText } = renderWithTheme(
      <BottomSheet visible={false} onClose={onClose}>
        <Text>Sheet Content</Text>
      </BottomSheet>
    );
    expect(queryByText('Sheet Content')).toBeNull();
  });

  it('renders the title when provided', () => {
    const { getByText } = renderWithTheme(
      <BottomSheet visible onClose={onClose} title="Options">
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(getByText('Options')).toBeTruthy();
  });

  it('renders the drag handle', () => {
    const { getByLabelText } = renderWithTheme(
      <BottomSheet visible onClose={onClose}>
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(getByLabelText('Drag handle, swipe down to close')).toBeTruthy();
  });

  it('applies testID prop to the Modal', () => {
    const { getByTestId } = renderWithTheme(
      <BottomSheet visible onClose={onClose} testID="bottom-sheet">
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(getByTestId('bottom-sheet')).toBeTruthy();
  });

  it('does not render title when not provided', () => {
    const { queryByText } = renderWithTheme(
      <BottomSheet visible onClose={onClose}>
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(queryByText('Options')).toBeNull();
  });
});

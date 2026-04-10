import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    const { getByText } = renderWithTheme(<EmptyState title="No results" />);
    expect(getByText('No results')).toBeTruthy();
  });

  it('renders the description when provided', () => {
    const { getByText } = renderWithTheme(
      <EmptyState title="No items" description="Try adding some items" />
    );
    expect(getByText('Try adding some items')).toBeTruthy();
  });

  it('does not render description when not provided', () => {
    const { queryByText } = renderWithTheme(<EmptyState title="Empty" />);
    expect(queryByText('Try adding some items')).toBeNull();
  });

  it('renders primary action button and calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <EmptyState
        title="No data"
        primaryAction={{ title: 'Add Item', onPress }}
      />
    );
    const button = getByText('Add Item');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders secondary action button', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <EmptyState
        title="No data"
        secondaryAction={{ title: 'Learn More', onPress }}
      />
    );
    expect(getByText('Learn More')).toBeTruthy();
  });

  it('renders both primary and secondary actions', () => {
    const { getByText } = renderWithTheme(
      <EmptyState
        title="Empty"
        primaryAction={{ title: 'Create', onPress: jest.fn() }}
        secondaryAction={{ title: 'Import', onPress: jest.fn() }}
      />
    );
    expect(getByText('Create')).toBeTruthy();
    expect(getByText('Import')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <EmptyState title="Empty" testID="empty-state" />
    );
    expect(getByTestId('empty-state')).toBeTruthy();
  });
});

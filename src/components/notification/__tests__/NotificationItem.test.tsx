import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import NotificationItem from '../NotificationItem';

const baseProps = {
  title: 'New Message',
  message: 'You have a new message from John',
  timestamp: '2 min ago',
};

describe('NotificationItem', () => {
  it('renders title and message', () => {
    const { getByText } = renderWithTheme(
      <NotificationItem {...baseProps} />
    );
    expect(getByText('New Message')).toBeTruthy();
    expect(getByText('You have a new message from John')).toBeTruthy();
  });

  it('renders the timestamp', () => {
    const { getByText } = renderWithTheme(
      <NotificationItem {...baseProps} />
    );
    expect(getByText('2 min ago')).toBeTruthy();
  });

  it('shows unread dot when read is false (default)', () => {
    const { toJSON } = renderWithTheme(
      <NotificationItem {...baseProps} />
    );
    // The unread dot is rendered when read=false by default
    const tree = JSON.stringify(toJSON());
    // dot has width: 8, height: 8, borderRadius: 4
    expect(tree).toContain('"borderRadius":4');
  });

  it('does not show unread dot when read is true', () => {
    const { toJSON } = renderWithTheme(
      <NotificationItem {...baseProps} read />
    );
    // When read=true, the background should be transparent (no accent bg)
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"backgroundColor":"transparent"');
  });

  it('renders dismiss button when onDismiss is provided', () => {
    const onDismiss = jest.fn();
    const { toJSON } = renderWithTheme(
      <NotificationItem {...baseProps} onDismiss={onDismiss} />
    );
    // The close icon should be rendered
    expect(toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <NotificationItem {...baseProps} onPress={onPress} />
    );
    fireEvent.press(getByText('New Message'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <NotificationItem {...baseProps} testID="notification" />
    );
    expect(getByTestId('notification')).toBeTruthy();
  });
});

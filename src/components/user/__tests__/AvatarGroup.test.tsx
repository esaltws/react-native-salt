import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import AvatarGroup from '../AvatarGroup';

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    key: `user-${i}`,
    name: `User ${i}`,
  }));

describe('AvatarGroup', () => {
  it('renders up to max avatars', () => {
    const items = makeItems(6);
    const { getAllByText } = renderWithTheme(
      <AvatarGroup items={items} max={3} />
    );
    // Each avatar shows an initial "U" for "User N"
    // 3 visible avatars should be rendered
    const avatarTexts = getAllByText(/^U/);
    expect(avatarTexts.length).toBe(3);
  });

  it('shows overflow count when items exceed max', () => {
    const items = makeItems(7);
    const { getByText } = renderWithTheme(
      <AvatarGroup items={items} max={4} />
    );
    expect(getByText('+3')).toBeTruthy();
  });

  it('does not show overflow badge when items fit within max', () => {
    const items = makeItems(2);
    const { queryByText } = renderWithTheme(
      <AvatarGroup items={items} max={4} />
    );
    expect(queryByText(/^\+/)).toBeNull();
  });

  it('applies testID prop', () => {
    const items = makeItems(2);
    const { getByTestId } = renderWithTheme(
      <AvatarGroup items={items} testID="avatar-group" />
    );
    expect(getByTestId('avatar-group')).toBeTruthy();
  });

  it('renders all items when count equals max', () => {
    const items = makeItems(4);
    const { queryByText } = renderWithTheme(
      <AvatarGroup items={items} max={4} />
    );
    expect(queryByText(/^\+/)).toBeNull();
  });
});

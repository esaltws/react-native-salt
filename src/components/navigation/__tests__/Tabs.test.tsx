import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import Tabs from '../Tabs';

const mockItems = [
  { key: 'home', label: 'Home' },
  { key: 'search', label: 'Search' },
  { key: 'profile', label: 'Profile' },
];

describe('Tabs', () => {
  it('renders all tab items', () => {
    const { getByText } = renderWithTheme(
      <Tabs items={mockItems} selected="home" onSelect={jest.fn()} />
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('indicates the selected tab with accessibilityState', () => {
    const { getByRole, getAllByRole } = renderWithTheme(
      <Tabs items={mockItems} selected="search" onSelect={jest.fn()} />
    );

    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const searchTab = tabs[1];
    expect(searchTab.props.accessibilityState).toEqual({ selected: true });

    const homeTab = tabs[0];
    expect(homeTab.props.accessibilityState).toEqual({ selected: false });
  });

  it('calls onSelect when a tab is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <Tabs items={mockItems} selected="home" onSelect={onSelect} />
    );

    fireEvent.press(getByText('Profile'));
    expect(onSelect).toHaveBeenCalledWith('profile');
  });

  it('renders badge count on a tab', () => {
    const itemsWithBadge = [
      { key: 'inbox', label: 'Inbox', badge: 5 },
      { key: 'sent', label: 'Sent' },
    ];

    const { getByText } = renderWithTheme(
      <Tabs items={itemsWithBadge} selected="inbox" onSelect={jest.fn()} />
    );

    expect(getByText('5')).toBeTruthy();
  });

  it('renders 99+ for badge counts exceeding 99', () => {
    const itemsWithBigBadge = [
      { key: 'inbox', label: 'Inbox', badge: 150 },
    ];

    const { getByText } = renderWithTheme(
      <Tabs items={itemsWithBigBadge} selected="inbox" onSelect={jest.fn()} />
    );

    expect(getByText('99+')).toBeTruthy();
  });

  it('sets accessibilityRole to tab on each tab item', () => {
    const { getAllByRole } = renderWithTheme(
      <Tabs items={mockItems} selected="home" onSelect={jest.fn()} />
    );

    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('does not render badge when badge is 0 or undefined', () => {
    const itemsNoBadge = [
      { key: 'inbox', label: 'Inbox', badge: 0 },
      { key: 'sent', label: 'Sent' },
    ];

    const { queryByText } = renderWithTheme(
      <Tabs items={itemsNoBadge} selected="inbox" onSelect={jest.fn()} />
    );

    expect(queryByText('0')).toBeNull();
  });
});

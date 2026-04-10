import React from 'react';
import { Text as RNText } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import ProfileHeader from '../ProfileHeader';

describe('ProfileHeader', () => {
  it('renders the name', () => {
    const { getByText } = renderWithTheme(<ProfileHeader name="Jane Doe" />);
    expect(getByText('Jane Doe')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <ProfileHeader name="Jane Doe" subtitle="Software Engineer" />
    );
    expect(getByText('Software Engineer')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = renderWithTheme(<ProfileHeader name="Jane Doe" />);
    expect(queryByText('Software Engineer')).toBeNull();
  });

  it('renders stats labels and values', () => {
    const stats = [
      { label: 'Posts', value: '42' },
      { label: 'Followers', value: '1.2K' },
    ];
    const { getByText } = renderWithTheme(
      <ProfileHeader name="Jane" stats={stats} />
    );
    expect(getByText('42')).toBeTruthy();
    expect(getByText('Posts')).toBeTruthy();
    expect(getByText('1.2K')).toBeTruthy();
    expect(getByText('Followers')).toBeTruthy();
  });

  it('renders action node when provided', () => {
    const { getByText } = renderWithTheme(
      <ProfileHeader name="Jane" action={<RNText>Follow</RNText>} />
    );
    expect(getByText('Follow')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <ProfileHeader name="Jane" testID="profile" />
    );
    expect(getByTestId('profile')).toBeTruthy();
  });
});

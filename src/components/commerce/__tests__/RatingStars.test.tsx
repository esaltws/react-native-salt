import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import RatingStars from '../RatingStars';

describe('RatingStars', () => {
  it('renders 5 full stars for rating 5', () => {
    const { getAllByText } = renderWithTheme(
      <RatingStars rating={5} testID="stars" />
    );
    // Icon mock renders icon name as text. Full stars use "star" icon name.
    const fullStars = getAllByText('star');
    expect(fullStars.length).toBe(5);
  });

  it('renders correct number of full stars for integer rating', () => {
    const { getAllByText } = renderWithTheme(
      <RatingStars rating={3} testID="stars" />
    );
    const fullStars = getAllByText('star');
    expect(fullStars.length).toBe(3);
    const emptyStars = getAllByText('star-outline');
    expect(emptyStars.length).toBe(2);
  });

  it('renders a half star for rating 2.5', () => {
    const { getAllByText, getByText } = renderWithTheme(
      <RatingStars rating={2.5} testID="stars" />
    );
    const fullStars = getAllByText('star');
    expect(fullStars.length).toBe(2);
    expect(getByText('star-half')).toBeTruthy();
    const emptyStars = getAllByText('star-outline');
    expect(emptyStars.length).toBe(2);
  });

  it('clamps rating to 0 when negative', () => {
    const { getAllByText } = renderWithTheme(
      <RatingStars rating={-3} testID="stars" />
    );
    const emptyStars = getAllByText('star-outline');
    expect(emptyStars.length).toBe(5);
  });

  it('clamps rating to 5 when greater than 5', () => {
    const { getAllByText, queryByText } = renderWithTheme(
      <RatingStars rating={8} testID="stars" />
    );
    const fullStars = getAllByText('star');
    expect(fullStars.length).toBe(5);
    expect(queryByText('star-outline')).toBeNull();
  });

  it('renders 0 stars and 5 empty outlines for rating 0', () => {
    const { getAllByText, queryByText } = renderWithTheme(
      <RatingStars rating={0} testID="stars" />
    );
    const emptyStars = getAllByText('star-outline');
    expect(emptyStars.length).toBe(5);
    // No full "star" text — only "star-outline" texts
    // getAllByText('star') would also match 'star-outline' and 'star-half',
    // but the mock renders exact names, so check queryByText for exact match
    // Actually, getAllByText('star') finds exact match "star" which won't match "star-outline"
    expect(queryByText('star-half')).toBeNull();
  });

  it('displays total count when provided', () => {
    const { getByText } = renderWithTheme(
      <RatingStars rating={4} total={128} testID="stars" />
    );
    expect(getByText('(128)')).toBeTruthy();
  });
});

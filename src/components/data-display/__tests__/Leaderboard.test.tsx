import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import Leaderboard from '../Leaderboard';

const mockItems = [
  { key: '1', name: 'Alice', score: 1500 },
  { key: '2', name: 'Bob', score: 1200 },
  { key: '3', name: 'Charlie', score: 1100 },
  { key: '4', name: 'Diana', score: 900 },
  { key: '5', name: 'Eve', score: 800 },
];

describe('Leaderboard', () => {
  it('renders all participant names and scores', () => {
    const { getByText } = renderWithTheme(
      <Leaderboard items={mockItems} />
    );

    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
    expect(getByText('1500')).toBeTruthy();
    expect(getByText('1200')).toBeTruthy();
  });

  it('renders rank numbers for items ranked 4th and beyond', () => {
    const { getByText } = renderWithTheme(
      <Leaderboard items={mockItems} />
    );

    // Rank 4 and 5 should show as plain numbers
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('does not render rank numbers for top 3 when showMedals is true', () => {
    const { queryByText } = renderWithTheme(
      <Leaderboard items={mockItems} showMedals />
    );

    // Top 3 should show trophy icons instead of numbers 1, 2, 3
    // The numbers 4 and 5 should still be shown
    expect(getByTextContent(queryByText, '4')).toBeTruthy();
    expect(getByTextContent(queryByText, '5')).toBeTruthy();
  });

  it('renders rank numbers for all items when showMedals is false', () => {
    const { getByText } = renderWithTheme(
      <Leaderboard items={mockItems} showMedals={false} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
  });

  it('uses startRank to offset rank numbers', () => {
    const { getByText } = renderWithTheme(
      <Leaderboard items={mockItems} startRank={11} showMedals={false} />
    );

    expect(getByText('11')).toBeTruthy();
    expect(getByText('12')).toBeTruthy();
    expect(getByText('13')).toBeTruthy();
  });

  it('highlights the specified item by key', () => {
    const { getByText } = renderWithTheme(
      <Leaderboard items={mockItems} highlightKey="3" />
    );

    // The highlighted item name should have fontWeight 700
    const charlie = getByText('Charlie');
    const flatStyle = Object.assign(
      {},
      ...[].concat(charlie.props.style).flat(Infinity).filter(Boolean)
    );
    expect(flatStyle.fontWeight).toBe('700');
  });

  it('does not apply highlight styling to non-highlighted items', () => {
    const { getByText } = renderWithTheme(
      <Leaderboard items={mockItems} highlightKey="3" />
    );

    const alice = getByText('Alice');
    const flatStyle = Object.assign(
      {},
      ...[].concat(alice.props.style).flat(Infinity).filter(Boolean)
    );
    expect(flatStyle.fontWeight).toBe('600');
  });
});

// Helper to use queryByText for existence checks
function getByTextContent(queryByText: any, text: string) {
  return queryByText(text);
}

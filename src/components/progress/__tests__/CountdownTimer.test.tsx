import React from 'react';
import { renderWithTheme, act } from '../../../__tests__/test-utils';
import CountdownTimer from '../CountdownTimer';

describe('CountdownTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <CountdownTimer seconds={60} testID="timer" />
    );
    expect(getByTestId('timer')).toBeTruthy();
  });

  it('displays hours, minutes, and seconds labels', () => {
    const { getByText } = renderWithTheme(
      <CountdownTimer seconds={3661} testID="timer" />
    );
    expect(getByText('Sec')).toBeTruthy();
    expect(getByText('Min')).toBeTruthy();
    expect(getByText('Hours')).toBeTruthy();
  });

  it('shows days label when showDays is true and days > 0', () => {
    const { getByText } = renderWithTheme(
      <CountdownTimer seconds={90000} showDays testID="timer" />
    );
    expect(getByText('Days')).toBeTruthy();
  });

  it('hides labels when showLabels is false', () => {
    const { queryByText } = renderWithTheme(
      <CountdownTimer seconds={60} showLabels={false} testID="timer" />
    );
    expect(queryByText('Sec')).toBeNull();
    expect(queryByText('Min')).toBeNull();
    expect(queryByText('Hours')).toBeNull();
  });

  it('renders custom separator', () => {
    const { getAllByText } = renderWithTheme(
      <CountdownTimer seconds={3661} separator="-" testID="timer" />
    );
    expect(getAllByText('-').length).toBeGreaterThanOrEqual(2);
  });

  it('renders default separator :', () => {
    const { getAllByText } = renderWithTheme(
      <CountdownTimer seconds={3661} testID="timer" />
    );
    expect(getAllByText(':').length).toBeGreaterThanOrEqual(2);
  });

  it('counts down when running', () => {
    const { getByText, queryByText } = renderWithTheme(
      <CountdownTimer seconds={5} running testID="timer" />
    );
    expect(getByText('05')).toBeTruthy();
    act(() => { jest.advanceTimersByTime(1000); });
    expect(getByText('04')).toBeTruthy();
  });

  it('calls onComplete when reaching zero', () => {
    const onComplete = jest.fn();
    renderWithTheme(
      <CountdownTimer seconds={2} running onComplete={onComplete} testID="timer" />
    );
    act(() => { jest.advanceTimersByTime(2000); });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('does not count when running is false', () => {
    const { getByText } = renderWithTheme(
      <CountdownTimer seconds={5} running={false} testID="timer" />
    );
    expect(getByText('05')).toBeTruthy();
    act(() => { jest.advanceTimersByTime(2000); });
    expect(getByText('05')).toBeTruthy();
  });

  it('renders md size boxes by default (dimensions.xl = 56)', () => {
    const { toJSON } = renderWithTheme(
      <CountdownTimer seconds={60} testID="timer" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"width":56');
    expect(tree).toContain('"height":56');
  });

  it('renders sm size boxes (dimensions.md = 40)', () => {
    const { toJSON } = renderWithTheme(
      <CountdownTimer seconds={60} size="sm" testID="timer" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"width":40');
    expect(tree).toContain('"height":40');
  });

  it('renders lg size boxes (dimensions.xxl = 68)', () => {
    const { toJSON } = renderWithTheme(
      <CountdownTimer seconds={60} size="lg" testID="timer" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"width":68');
    expect(tree).toContain('"height":68');
  });
});

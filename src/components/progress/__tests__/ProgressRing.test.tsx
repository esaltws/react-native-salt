import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import ProgressRing from '../ProgressRing';

describe('ProgressRing', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <ProgressRing progress={0.5} testID="ring" />
    );
    expect(getByTestId('ring')).toBeTruthy();
  });

  it('shows percentage label by default', () => {
    const { getByText } = renderWithTheme(
      <ProgressRing progress={0.75} testID="ring" />
    );
    expect(getByText('75%')).toBeTruthy();
  });

  it('shows 0% for zero progress', () => {
    const { getByText } = renderWithTheme(
      <ProgressRing progress={0} testID="ring" />
    );
    expect(getByText('0%')).toBeTruthy();
  });

  it('shows 100% for full progress', () => {
    const { getByText } = renderWithTheme(
      <ProgressRing progress={1} testID="ring" />
    );
    expect(getByText('100%')).toBeTruthy();
  });

  it('clamps progress above 1 to 100%', () => {
    const { getByText } = renderWithTheme(
      <ProgressRing progress={1.5} testID="ring" />
    );
    expect(getByText('100%')).toBeTruthy();
  });

  it('clamps negative progress to 0%', () => {
    const { getByText } = renderWithTheme(
      <ProgressRing progress={-0.5} testID="ring" />
    );
    expect(getByText('0%')).toBeTruthy();
  });

  it('renders custom label instead of percentage', () => {
    const { getByText, queryByText } = renderWithTheme(
      <ProgressRing progress={0.5} label="A+" testID="ring" />
    );
    expect(getByText('A+')).toBeTruthy();
    expect(queryByText('50%')).toBeNull();
  });

  it('renders sublabel when provided', () => {
    const { getByText } = renderWithTheme(
      <ProgressRing progress={0.5} sublabel="Complete" testID="ring" />
    );
    expect(getByText('Complete')).toBeTruthy();
  });

  it('renders sm size ring (80px)', () => {
    const { toJSON } = renderWithTheme(
      <ProgressRing progress={0.5} size="sm" testID="ring" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"width":80');
    expect(tree).toContain('"height":80');
  });

  it('renders md size ring (120px) by default', () => {
    const { toJSON } = renderWithTheme(
      <ProgressRing progress={0.5} testID="ring" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"width":120');
    expect(tree).toContain('"height":120');
  });

  it('renders lg size ring (160px)', () => {
    const { toJSON } = renderWithTheme(
      <ProgressRing progress={0.5} size="lg" testID="ring" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"width":160');
    expect(tree).toContain('"height":160');
  });

  it('applies intent color to progress segments', () => {
    const { toJSON } = renderWithTheme(
      <ProgressRing progress={0.5} intent="success" testID="ring" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"backgroundColor":"#16a34a"');
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import AlertDialog from '../AlertDialog';

describe('AlertDialog', () => {
  it('renders title when visible', () => {
    const { getByText } = renderWithTheme(
      <AlertDialog visible onClose={jest.fn()} title="Delete?" />
    );
    expect(getByText('Delete?')).toBeTruthy();
  });

  it('renders message', () => {
    const { getByText } = renderWithTheme(
      <AlertDialog visible onClose={jest.fn()} title="Alert" message="Are you sure?" />
    );
    expect(getByText('Are you sure?')).toBeTruthy();
  });

  it('calls onConfirm and onClose on confirm press', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <AlertDialog visible onClose={onClose} title="Test" onConfirm={onConfirm} />
    );
    fireEvent.press(getByText('OK'));
    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onCancel and onClose on cancel press', () => {
    const onCancel = jest.fn();
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <AlertDialog visible onClose={onClose} title="Test" onCancel={onCancel} />
    );
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('uses custom confirm/cancel text', () => {
    const { getByText } = renderWithTheme(
      <AlertDialog visible onClose={jest.fn()} title="Test" onConfirm={jest.fn()} confirmText="Yes" onCancel={jest.fn()} cancelText="No" />
    );
    expect(getByText('Yes')).toBeTruthy();
    expect(getByText('No')).toBeTruthy();
  });

  it('has accessibilityRole alert', () => {
    const { toJSON } = renderWithTheme(
      <AlertDialog visible onClose={jest.fn()} title="Test" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"accessibilityRole":"alert"');
  });
});

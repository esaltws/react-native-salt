import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders title and message when visible', () => {
    const { getByText } = renderWithTheme(
      <Modal visible onClose={jest.fn()} title="Alert" message="Something happened" />
    );
    expect(getByText('Alert')).toBeTruthy();
    expect(getByText('Something happened')).toBeTruthy();
  });

  it('renders confirm and cancel buttons', () => {
    const { getByText } = renderWithTheme(
      <Modal visible onClose={jest.fn()} onConfirm={jest.fn()} onCancel={jest.fn()} />
    );
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('calls onConfirm and onClose when confirm pressed', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <Modal visible onClose={onClose} onConfirm={onConfirm} />
    );
    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onCancel and onClose when cancel pressed', () => {
    const onCancel = jest.fn();
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <Modal visible onClose={onClose} onCancel={onCancel} />
    );
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('shows close button when closable', () => {
    const { getByLabelText } = renderWithTheme(
      <Modal visible onClose={jest.fn()} closable />
    );
    expect(getByLabelText('Close')).toBeTruthy();
  });

  it('renders children as custom content', () => {
    const { getByText } = renderWithTheme(
      <Modal visible onClose={jest.fn()}>
        <Text>Custom content</Text>
      </Modal>
    );
    expect(getByText('Custom content')).toBeTruthy();
  });

  it('has accessibilityViewIsModal', () => {
    const { UNSAFE_getAllByProps } = renderWithTheme(
      <Modal visible onClose={jest.fn()} title="Test" />
    );
    const modals = UNSAFE_getAllByProps({ accessibilityViewIsModal: true });
    expect(modals.length).toBeGreaterThan(0);
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import PermissionCard from '../PermissionCard';

describe('PermissionCard', () => {
  it('renders the title', () => {
    const { getByText } = renderWithTheme(
      <PermissionCard title="Camera Access" />
    );
    expect(getByText('Camera Access')).toBeTruthy();
  });

  it('renders the status badge with default unknown status', () => {
    const { getByText } = renderWithTheme(
      <PermissionCard title="Camera" />
    );
    expect(getByText('Not Requested')).toBeTruthy();
  });

  it('renders Granted status label when status is granted', () => {
    const { getByText } = renderWithTheme(
      <PermissionCard title="Location" status="granted" onActionPress={jest.fn()} />
    );
    expect(getByText('Granted')).toBeTruthy();
  });

  it('renders Denied status with Try Again action text', () => {
    const { getByText } = renderWithTheme(
      <PermissionCard title="Contacts" status="denied" onActionPress={jest.fn()} />
    );
    expect(getByText('Denied')).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('disables the action button when status is granted', () => {
    const onActionPress = jest.fn();
    const { getByText } = renderWithTheme(
      <PermissionCard title="Camera" status="granted" onActionPress={onActionPress} />
    );
    // The button text for granted status is "Granted" as the default
    const button = getByText('Granted');
    fireEvent.press(button);
    expect(onActionPress).not.toHaveBeenCalled();
  });

  it('calls onActionPress when action button is pressed for non-granted status', () => {
    const onActionPress = jest.fn();
    const { getByText } = renderWithTheme(
      <PermissionCard title="Camera" status="unknown" onActionPress={onActionPress} />
    );
    fireEvent.press(getByText('Allow Access'));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });

  it('renders description when provided', () => {
    const { getByText } = renderWithTheme(
      <PermissionCard title="Camera" description="We need camera to take photos" />
    );
    expect(getByText('We need camera to take photos')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <PermissionCard title="Camera" testID="permission-card" />
    );
    expect(getByTestId('permission-card')).toBeTruthy();
  });
});

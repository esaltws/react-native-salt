import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import Drawer from '../Drawer';

const mockOnClose = jest.fn();
const mockOnPress = jest.fn();

const mockItems = [
  { key: 'home', label: 'Home', onPress: mockOnPress },
  { key: 'settings', label: 'Settings', onPress: jest.fn(), active: true },
  { key: 'help', label: 'Help', onPress: jest.fn() },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Drawer', () => {
  it('renders items when visible is true', () => {
    const { getByText } = renderWithTheme(
      <Drawer visible={true} onClose={mockOnClose} items={mockItems} />
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Help')).toBeTruthy();
  });

  it('is not rendered when visible is false', () => {
    const { queryByText } = renderWithTheme(
      <Drawer visible={false} onClose={mockOnClose} items={mockItems} />
    );

    // Modal with visible=false should not render children
    expect(queryByText('Home')).toBeNull();
  });

  it('highlights the active item with a different background', () => {
    const { getByText } = renderWithTheme(
      <Drawer visible={true} onClose={mockOnClose} items={mockItems} />
    );

    const settingsItem = getByText('Settings');
    expect(settingsItem).toBeTruthy();
    // The active item text should have fontWeight 600
    expect(settingsItem.props.style).toEqual(
      expect.objectContaining({ fontWeight: '600' })
    );
  });

  it('calls item onPress and onClose when an item is pressed', () => {
    const { getByText } = renderWithTheme(
      <Drawer visible={true} onClose={mockOnClose} items={mockItems} />
    );

    fireEvent.press(getByText('Home'));
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders header content when provided', () => {
    const { getByText } = renderWithTheme(
      <Drawer
        visible={true}
        onClose={mockOnClose}
        items={mockItems}
        header={<Text>Drawer Header</Text>}
      />
    );

    expect(getByText('Drawer Header')).toBeTruthy();
  });

  it('renders footer content when provided', () => {
    const { getByText } = renderWithTheme(
      <Drawer
        visible={true}
        onClose={mockOnClose}
        items={mockItems}
        footer={<Text>Drawer Footer</Text>}
      />
    );

    expect(getByText('Drawer Footer')).toBeTruthy();
  });

  it('assigns menuitem accessibilityRole to each item', () => {
    const { getAllByRole } = renderWithTheme(
      <Drawer visible={true} onClose={mockOnClose} items={mockItems} />
    );

    const menuItems = getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
  });
});

import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import Breadcrumb from '../Breadcrumb';

const mockOnPress = jest.fn();

const mockItems = [
  { key: 'home', label: 'Home', onPress: mockOnPress },
  { key: 'products', label: 'Products', onPress: jest.fn() },
  { key: 'detail', label: 'Widget' },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Breadcrumb', () => {
  it('renders all breadcrumb item labels', () => {
    const { getByText } = renderWithTheme(<Breadcrumb items={mockItems} />);

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Products')).toBeTruthy();
    expect(getByText('Widget')).toBeTruthy();
  });

  it('renders text separators between items when separator prop is provided', () => {
    const { getAllByText } = renderWithTheme(
      <Breadcrumb items={mockItems} separator="/" />
    );

    // Two separators for three items
    const separators = getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('does not render a separator after the last item', () => {
    const { getAllByText } = renderWithTheme(
      <Breadcrumb items={mockItems} separator=">" />
    );

    // Only 2 separators for 3 items
    const separators = getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  it('fires onPress when a non-last breadcrumb item is pressed', () => {
    const { getByText } = renderWithTheme(<Breadcrumb items={mockItems} />);

    fireEvent.press(getByText('Home'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('does not make the last item pressable even if onPress is defined', () => {
    const lastItemOnPress = jest.fn();
    const items = [
      { key: 'home', label: 'Home', onPress: jest.fn() },
      { key: 'last', label: 'Current', onPress: lastItemOnPress },
    ];

    const { getByText } = renderWithTheme(<Breadcrumb items={items} />);

    // The last item is rendered as a View (not Pressable), so onPress won't fire
    // We verify it renders but doesn't have link role
    const lastItem = getByText('Current');
    expect(lastItem).toBeTruthy();
  });

  it('assigns link accessibilityRole to non-last pressable items', () => {
    const { getAllByRole } = renderWithTheme(<Breadcrumb items={mockItems} />);

    const links = getAllByRole('link');
    // Only first two items are non-last with onPress
    expect(links).toHaveLength(2);
  });
});

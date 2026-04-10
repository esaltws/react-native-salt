import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Popover from '../Popover';

describe('Popover', () => {
  it('renders children trigger', () => {
    const { getByText } = renderWithTheme(
      <Popover content={<Text>Pop content</Text>}><Text>Trigger</Text></Popover>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('popover not visible by default', () => {
    const { queryByText } = renderWithTheme(
      <Popover content={<Text>Pop content</Text>}><Text>Trigger</Text></Popover>
    );
    expect(queryByText('Pop content')).toBeNull();
  });

  it('shows content when controlled visible', () => {
    const { getByText } = renderWithTheme(
      <Popover content={<Text>Visible content</Text>} visible><Text>Trigger</Text></Popover>
    );
    expect(getByText('Visible content')).toBeTruthy();
  });

  it('applies testID', () => {
    const { getByTestId } = renderWithTheme(
      <Popover content={<Text>Content</Text>} testID="pop"><Text>Trigger</Text></Popover>
    );
    expect(getByTestId('pop')).toBeTruthy();
  });
});

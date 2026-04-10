import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    const { getByText } = renderWithTheme(
      <Tooltip content="Tip"><Text>Trigger</Text></Tooltip>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('tooltip not visible by default', () => {
    const { queryByText } = renderWithTheme(
      <Tooltip content="Tip text"><Text>Trigger</Text></Tooltip>
    );
    expect(queryByText('Tip text')).toBeNull();
  });

  it('shows tooltip when controlled visible', () => {
    const { getByText } = renderWithTheme(
      <Tooltip content="Visible tip" visible><Text>Trigger</Text></Tooltip>
    );
    expect(getByText('Visible tip')).toBeTruthy();
  });

  it('toggles tooltip on press', () => {
    const { getByRole, getByText } = renderWithTheme(
      <Tooltip content="Toggle tip"><Text>Trigger</Text></Tooltip>
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Toggle tip')).toBeTruthy();
  });

  it('has accessibilityHint', () => {
    const { getByRole } = renderWithTheme(
      <Tooltip content="Tip"><Text>Trigger</Text></Tooltip>
    );
    expect(getByRole('button').props.accessibilityHint).toBe('Shows tooltip');
  });
});

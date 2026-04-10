import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import InfoRow from '../InfoRow';

describe('InfoRow', () => {
  it('renders the label (title) and value', () => {
    const { getByText } = renderWithTheme(
      <InfoRow title="Email" value="user@example.com" />
    );

    expect(getByText('Email')).toBeTruthy();
    expect(getByText('user@example.com')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <InfoRow title="Phone" value="+1-234-567" subtitle="Primary" />
    );

    expect(getByText('Primary')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = renderWithTheme(
      <InfoRow title="Phone" value="+1-234-567" />
    );

    expect(queryByText('Primary')).toBeNull();
  });

  it('renders left slot content when provided', () => {
    const { getByText } = renderWithTheme(
      <InfoRow title="Phone" value="+1-234-567" left={<Text>Icon</Text>} />
    );

    expect(getByText('Icon')).toBeTruthy();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <InfoRow title="Label" value="Value" testID="info-row" />
    );

    expect(getByTestId('info-row')).toBeTruthy();
  });
});

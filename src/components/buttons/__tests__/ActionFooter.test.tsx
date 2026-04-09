import React from 'react';
import { View, Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import ActionFooter from '../ActionFooter';
import Button from '../Button';

describe('ActionFooter', () => {
  // ── Renders action buttons ─────────────────────────────────────────
  it('renders children passed to it', () => {
    const { getByText } = renderWithTheme(
      <ActionFooter>
        <Text>Action 1</Text>
        <Text>Action 2</Text>
      </ActionFooter>
    );
    expect(getByText('Action 1')).toBeTruthy();
    expect(getByText('Action 2')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <ActionFooter testID="footer">
        <Text>Child</Text>
      </ActionFooter>
    );
    expect(getByTestId('footer')).toBeTruthy();
  });

  // ── Primary / secondary actions ────────────────────────────────────
  it('renders primary and secondary action buttons', () => {
    const primary = jest.fn();
    const secondary = jest.fn();
    const { getByText } = renderWithTheme(
      <ActionFooter testID="footer">
        <Button title="Cancel" variant="outline" onPress={secondary} testID="cancel-btn" />
        <Button title="Save" variant="solid" onPress={primary} testID="save-btn" />
      </ActionFooter>
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Save')).toBeTruthy();
  });

  // ── Container styling ──────────────────────────────────────────────
  it('has surface background color', () => {
    const { getByTestId } = renderWithTheme(
      <ActionFooter testID="footer">
        <Text>Content</Text>
      </ActionFooter>
    );
    const footer = getByTestId('footer');
    const flatStyle = Object.assign({}, ...([].concat(footer.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.backgroundColor).toBe('#ffffff'); // light theme surface
  });

  it('has a top border', () => {
    const { getByTestId } = renderWithTheme(
      <ActionFooter testID="footer">
        <Text>Content</Text>
      </ActionFooter>
    );
    const footer = getByTestId('footer');
    const flatStyle = Object.assign({}, ...([].concat(footer.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.borderTopWidth).toBe(1);
    expect(flatStyle.borderTopColor).toBe('#e2e8f0'); // light theme border
  });

  it('has horizontal and vertical padding', () => {
    const { getByTestId } = renderWithTheme(
      <ActionFooter testID="footer">
        <Text>Content</Text>
      </ActionFooter>
    );
    const footer = getByTestId('footer');
    const flatStyle = Object.assign({}, ...([].concat(footer.props.style).flat(Infinity).filter(Boolean)));
    // spacing.lg = 16, spacing.md = 12
    expect(flatStyle.paddingHorizontal).toBe(16);
    expect(flatStyle.paddingVertical).toBe(12);
  });

  // ── Custom style merging ───────────────────────────────────────────
  it('merges custom style', () => {
    const { getByTestId } = renderWithTheme(
      <ActionFooter testID="footer" style={{ marginBottom: 20 }}>
        <Text>Content</Text>
      </ActionFooter>
    );
    const footer = getByTestId('footer');
    const flatStyle = Object.assign({}, ...([].concat(footer.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.marginBottom).toBe(20);
  });

  // ── Multiple children render ───────────────────────────────────────
  it('renders multiple Button components as children', () => {
    const { getByText } = renderWithTheme(
      <ActionFooter testID="footer">
        <Button title="Discard" variant="ghost" />
        <Button title="Save Draft" variant="outline" />
        <Button title="Publish" variant="solid" />
      </ActionFooter>
    );
    expect(getByText('Discard')).toBeTruthy();
    expect(getByText('Save Draft')).toBeTruthy();
    expect(getByText('Publish')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ActionSheet from '../ActionSheet';

describe('ActionSheet', () => {
  const defaultOptions = [
    { label: 'Edit', onPress: jest.fn() },
    { label: 'Share', onPress: jest.fn() },
  ];
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Renders when visible ───────────────────────────────────────────
  it('renders when visible is true', () => {
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={defaultOptions} />
    );
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
  });

  it('does not render options when visible is false', () => {
    const { queryByText } = renderWithTheme(
      <ActionSheet visible={false} onClose={onClose} options={defaultOptions} />
    );
    expect(queryByText('Edit')).toBeNull();
    expect(queryByText('Share')).toBeNull();
  });

  // ── Shows title and options ────────────────────────────────────────
  it('renders the title when provided', () => {
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} title="Choose Action" options={defaultOptions} />
    );
    expect(getByText('Choose Action')).toBeTruthy();
  });

  it('renders all option labels', () => {
    const options = [
      { label: 'Option A', onPress: jest.fn() },
      { label: 'Option B', onPress: jest.fn() },
      { label: 'Option C', onPress: jest.fn() },
    ];
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={options} />
    );
    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
    expect(getByText('Option C')).toBeTruthy();
  });

  // ── Option press calls callback and closes ─────────────────────────
  it('calls option onPress and onClose when option is pressed', () => {
    const optionPress = jest.fn();
    const options = [{ label: 'Delete', onPress: optionPress }];
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={options} />
    );
    fireEvent.press(getByText('Delete'));
    expect(optionPress).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ── Destructive option gets danger color ───────────────────────────
  it('destructive option text uses danger color', () => {
    const options = [
      { label: 'Delete Forever', onPress: jest.fn(), destructive: true },
    ];
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={options} />
    );
    const destructiveText = getByText('Delete Forever');
    const flatStyle = Object.assign({}, ...([].concat(destructiveText.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.color).toBe('#dc2626'); // light theme danger
  });

  it('destructive option text uses fontWeight 600', () => {
    const options = [
      { label: 'Delete', onPress: jest.fn(), destructive: true },
    ];
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={options} />
    );
    const destructiveText = getByText('Delete');
    const flatStyle = Object.assign({}, ...([].concat(destructiveText.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.fontWeight).toBe('600');
  });

  it('non-destructive option text uses normal text color', () => {
    const options = [
      { label: 'Normal Action', onPress: jest.fn(), destructive: false },
    ];
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={options} />
    );
    const normalText = getByText('Normal Action');
    const flatStyle = Object.assign({}, ...([].concat(normalText.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.color).toBe('#0f172a'); // light theme text
  });

  // ── Cancel button ──────────────────────────────────────────────────
  it('renders Cancel button', () => {
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={defaultOptions} />
    );
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('Cancel button calls onClose', () => {
    const { getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={defaultOptions} />
    );
    fireEvent.press(getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Cancel button has accessibilityLabel', () => {
    const { getByLabelText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={defaultOptions} />
    );
    expect(getByLabelText('Cancel')).toBeTruthy();
  });

  // ── Options have accessibility ─────────────────────────────────────
  it('each option has accessibilityRole button and accessibilityLabel', () => {
    const options = [{ label: 'My Action', onPress: jest.fn() }];
    const { getByLabelText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={options} />
    );
    const option = getByLabelText('My Action');
    expect(option.props.accessibilityRole).toBe('button');
  });

  // ── Edge: empty options ────────────────────────────────────────────
  it('renders with empty options array (just Cancel)', () => {
    const { getByText, queryByLabelText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={[]} />
    );
    expect(getByText('Cancel')).toBeTruthy();
    // No option elements besides Cancel
  });

  // ── Edge: no title ─────────────────────────────────────────────────
  it('renders without title', () => {
    const { queryByText, getByText } = renderWithTheme(
      <ActionSheet visible={true} onClose={onClose} options={defaultOptions} />
    );
    // No title rendered, but options and cancel still present
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });
});

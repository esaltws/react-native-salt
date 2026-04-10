import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders the label text', () => {
    const { getByText } = renderWithTheme(
      <Badge label="New" testID="badge" />
    );
    expect(getByText('New')).toBeTruthy();
  });

  it('applies solid variant with intent background color', () => {
    const { getByTestId } = renderWithTheme(
      <Badge label="Info" intent="primary" variant="solid" testID="badge" />
    );
    const badge = getByTestId('badge');
    const flatStyle = Object.assign(
      {},
      ...([].concat(badge.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#2563eb'); // light theme primary
  });

  it('applies outline variant with transparent background and border', () => {
    const { getByTestId } = renderWithTheme(
      <Badge label="Outlined" intent="danger" variant="outline" testID="badge" />
    );
    const badge = getByTestId('badge');
    const flatStyle = Object.assign(
      {},
      ...([].concat(badge.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('transparent');
    expect(flatStyle.borderWidth).toBe(1);
    expect(flatStyle.borderColor).toBe('#dc2626'); // light theme danger
  });

  it('maps intent to the correct color for success', () => {
    const { getByTestId } = renderWithTheme(
      <Badge label="OK" intent="success" variant="solid" testID="badge" />
    );
    const badge = getByTestId('badge');
    const flatStyle = Object.assign(
      {},
      ...([].concat(badge.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#16a34a'); // light theme success
  });

  it('applies sm size with smaller padding', () => {
    const { getByTestId } = renderWithTheme(
      <Badge label="Sm" size="sm" testID="badge" />
    );
    const badge = getByTestId('badge');
    const flatStyle = Object.assign(
      {},
      ...([].concat(badge.props.style as any).flat(Infinity).filter(Boolean))
    );
    // sm uses spacing.xs for paddingVertical and spacing.sm for paddingHorizontal
    expect(flatStyle.paddingVertical).toBe(4);  // spacing.xs = 4
    expect(flatStyle.paddingHorizontal).toBe(8); // spacing.sm = 8
  });

  it('applies lg size with larger padding', () => {
    const { getByTestId } = renderWithTheme(
      <Badge label="Lg" size="lg" testID="badge" />
    );
    const badge = getByTestId('badge');
    const flatStyle = Object.assign(
      {},
      ...([].concat(badge.props.style as any).flat(Infinity).filter(Boolean))
    );
    // lg uses spacing.sm for paddingVertical and spacing.lg for paddingHorizontal
    expect(flatStyle.paddingVertical).toBe(8);  // spacing.sm = 8
    expect(flatStyle.paddingHorizontal).toBe(16); // spacing.lg = 16
  });

  it('uses surface color for text in solid variant', () => {
    const { getByText } = renderWithTheme(
      <Badge label="SolidText" intent="primary" variant="solid" testID="badge" />
    );
    const text = getByText('SolidText');
    const flatStyle = Object.assign(
      {},
      ...([].concat(text.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.color).toBe('#ffffff'); // light theme surface
  });
});

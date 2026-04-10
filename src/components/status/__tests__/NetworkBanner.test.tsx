import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import NetworkBanner from '../NetworkBanner';

describe('NetworkBanner', () => {
  it('renders the default message when visible is true', () => {
    const { getByText } = renderWithTheme(
      <NetworkBanner visible={true} testID="banner" />
    );
    expect(getByText('No internet connection')).toBeTruthy();
  });

  it('returns null when visible is false', () => {
    const { toJSON } = renderWithTheme(
      <NetworkBanner visible={false} testID="banner" />
    );
    expect(toJSON()).toBeNull();
  });

  it('renders custom message when provided', () => {
    const { getByText } = renderWithTheme(
      <NetworkBanner visible={true} message="Connection lost" testID="banner" />
    );
    expect(getByText('Connection lost')).toBeTruthy();
  });

  it('renders with testID when visible', () => {
    const { getByTestId } = renderWithTheme(
      <NetworkBanner visible={true} testID="banner" />
    );
    expect(getByTestId('banner')).toBeTruthy();
  });

  it('applies intent-based background color', () => {
    const { getByTestId } = renderWithTheme(
      <NetworkBanner visible={true} intent="danger" testID="banner" />
    );
    const banner = getByTestId('banner');
    const flatStyle = Object.assign(
      {},
      ...([].concat(banner.props.style as any).flat(Infinity).filter(Boolean))
    );
    // danger color is #dc2626, background should be #dc262626 (with alpha suffix)
    expect(flatStyle.backgroundColor).toBe('#dc262626');
  });
});

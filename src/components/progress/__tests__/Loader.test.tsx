import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Loader from '../Loader';

describe('Loader', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <Loader testID="loader" />
    );
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('renders without label by default', () => {
    const { queryByText } = renderWithTheme(
      <Loader testID="loader" />
    );
    expect(queryByText('Loading')).toBeNull();
  });

  it('renders label when provided', () => {
    const { getByText } = renderWithTheme(
      <Loader label="Loading..." testID="loader" />
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders ActivityIndicator with primary color', () => {
    const { toJSON } = renderWithTheme(
      <Loader testID="loader" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"color":"#2563eb"');
  });

  it('defaults to md size (maps to small ActivityIndicator)', () => {
    const { toJSON } = renderWithTheme(
      <Loader testID="loader" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"size":"small"');
  });

  it('sm maps to small ActivityIndicator', () => {
    const { toJSON } = renderWithTheme(
      <Loader size="sm" testID="loader" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"size":"small"');
  });

  it('lg maps to large ActivityIndicator', () => {
    const { toJSON } = renderWithTheme(
      <Loader size="lg" testID="loader" />
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"size":"large"');
  });

  it('applies custom style', () => {
    const { getByTestId } = renderWithTheme(
      <Loader testID="loader" style={{ marginTop: 20 }} />
    );
    const loader = getByTestId('loader');
    const flatStyle = Object.assign(
      {},
      ...([].concat(loader.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.marginTop).toBe(20);
  });
});

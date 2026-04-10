import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import PriceTag from '../PriceTag';

describe('PriceTag', () => {
  it('formats currency symbol and amount with two decimal places', () => {
    const { getByText } = renderWithTheme(
      <PriceTag amount={19.9} testID="price" />
    );
    expect(getByText('$19.90')).toBeTruthy();
  });

  it('uses custom currency symbol', () => {
    const { getByText } = renderWithTheme(
      <PriceTag amount={25} currency="€" testID="price" />
    );
    expect(getByText('€25.00')).toBeTruthy();
  });

  it('shows original price with strikethrough when original > amount', () => {
    const { getByText } = renderWithTheme(
      <PriceTag amount={15} original={30} testID="price" />
    );
    expect(getByText('$15.00')).toBeTruthy();
    const originalText = getByText('$30.00');
    expect(originalText).toBeTruthy();
    const flatStyle = Object.assign(
      {},
      ...([].concat(originalText.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.textDecorationLine).toBe('line-through');
  });

  it('does not show original price when original is undefined', () => {
    const { queryByText } = renderWithTheme(
      <PriceTag amount={20} testID="price" />
    );
    expect(queryByText('$20.00')).toBeTruthy();
    // No second price element
    const tree = renderWithTheme(<PriceTag amount={20} testID="price2" />);
    expect(tree.queryByText(/line-through/)).toBeNull();
  });

  it('does not show original price when original <= amount', () => {
    const { queryByText } = renderWithTheme(
      <PriceTag amount={30} original={20} testID="price" />
    );
    expect(queryByText('$30.00')).toBeTruthy();
    expect(queryByText('$20.00')).toBeNull();
  });

  it('renders with sm size without crashing', () => {
    const { getByText } = renderWithTheme(
      <PriceTag amount={9.99} size="sm" testID="price" />
    );
    expect(getByText('$9.99')).toBeTruthy();
  });

  it('renders with lg size without crashing', () => {
    const { getByText } = renderWithTheme(
      <PriceTag amount={99.99} size="lg" testID="price" />
    );
    expect(getByText('$99.99')).toBeTruthy();
  });
});

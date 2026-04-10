import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ColorPickerTrigger from '../ColorPickerTrigger';

describe('ColorPickerTrigger', () => {
  it('renders the color swatch', () => {
    const { toJSON } = renderWithTheme(
      <ColorPickerTrigger color="#ff0000" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders label text when provided', () => {
    const { getByText } = renderWithTheme(
      <ColorPickerTrigger color="#ff0000" label="Primary Color" />
    );
    expect(getByText('Primary Color')).toBeTruthy();
  });

  it('displays hex value when showHex is true', () => {
    const { getByText } = renderWithTheme(
      <ColorPickerTrigger color="#ff0000" showHex />
    );
    expect(getByText('#ff0000')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <ColorPickerTrigger color="#ff0000" onPress={onPress} testID="trigger" />
    );
    fireEvent.press(getByTestId('trigger'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <ColorPickerTrigger color="#ff0000" onPress={onPress} disabled testID="trigger" />
    );
    fireEvent.press(getByTestId('trigger'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <ColorPickerTrigger color="#ff0000" testID="cpt" />
    );
    expect(getByTestId('cpt')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ColorPalette from '../ColorPalette';

const palette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

describe('ColorPalette', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it('renders all color swatches', () => {
    const { getByLabelText } = renderWithTheme(
      <ColorPalette colors={palette} value={null} onChange={onChange} />
    );
    palette.forEach((color) => {
      expect(getByLabelText(`Select color ${color}`)).toBeTruthy();
    });
  });

  it('calls onChange when a swatch is pressed', () => {
    const { getByLabelText } = renderWithTheme(
      <ColorPalette colors={palette} value={null} onChange={onChange} />
    );
    fireEvent.press(getByLabelText('Select color #00ff00'));
    expect(onChange).toHaveBeenCalledWith('#00ff00');
  });

  it('marks the selected swatch with selected state', () => {
    const { getByLabelText } = renderWithTheme(
      <ColorPalette colors={palette} value="#ff0000" onChange={onChange} />
    );
    const selected = getByLabelText('Select color #ff0000');
    expect(selected.props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true })
    );
  });

  it('renders label when provided', () => {
    const { getByText } = renderWithTheme(
      <ColorPalette colors={palette} value={null} onChange={onChange} label="Pick a color" />
    );
    expect(getByText('Pick a color')).toBeTruthy();
  });

  it('shows hex value when showHex and value are set', () => {
    const { getByText } = renderWithTheme(
      <ColorPalette colors={palette} value="#ff0000" onChange={onChange} showHex />
    );
    expect(getByText('#FF0000')).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <ColorPalette colors={palette} value={null} onChange={onChange} testID="palette" />
    );
    expect(getByTestId('palette')).toBeTruthy();
  });

  it('sets disabled accessibility state when disabled', () => {
    const { getByLabelText } = renderWithTheme(
      <ColorPalette colors={palette} value={null} onChange={onChange} disabled />
    );
    const swatch = getByLabelText('Select color #ff0000');
    expect(swatch.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });
});

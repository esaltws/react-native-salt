import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ColorPicker from '../ColorPicker';

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderWithTheme(<ColorPicker />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays the current color hex value', () => {
    const { getByText } = renderWithTheme(
      <ColorPicker color="#FF5733" />
    );
    // The component shows the hex uppercased
    expect(getByText(/FF5733/i)).toBeTruthy();
  });

  it('renders preset swatches', () => {
    const presets = ['#ff0000', '#00ff00', '#0000ff'];
    const { getByLabelText } = renderWithTheme(
      <ColorPicker presets={presets} />
    );
    expect(getByLabelText('Select color #ff0000')).toBeTruthy();
    expect(getByLabelText('Select color #00ff00')).toBeTruthy();
    expect(getByLabelText('Select color #0000ff')).toBeTruthy();
  });

  it('calls onColorChange when a preset is selected', () => {
    const onChange = jest.fn();
    const presets = ['#ff0000', '#00ff00'];
    const { getByLabelText } = renderWithTheme(
      <ColorPicker presets={presets} onColorChange={onChange} />
    );
    fireEvent.press(getByLabelText('Select color #ff0000'));
    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <ColorPicker testID="color-picker" />
    );
    expect(getByTestId('color-picker')).toBeTruthy();
  });

  it('renders the Presets label', () => {
    const { getByText } = renderWithTheme(<ColorPicker />);
    expect(getByText('Presets')).toBeTruthy();
  });

  it('renders recent colors when provided', () => {
    const { getByText, getByLabelText } = renderWithTheme(
      <ColorPicker recentColors={['#abcdef']} />
    );
    expect(getByText('Recent')).toBeTruthy();
    expect(getByLabelText('Select recent color #abcdef')).toBeTruthy();
  });
});

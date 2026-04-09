import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme } from '../../../__tests__/test-utils';
import Gradient from '../Gradient';

describe('Gradient', () => {
  it('renders with testID', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} />
    );

    expect(getByTestId('gradient')).toBeTruthy();
  });

  it('renders children on top of gradient', () => {
    const { getByText } = renderWithTheme(
      <Gradient colors={['#ff0000', '#0000ff']}>
        <Text>Overlay text</Text>
      </Gradient>
    );

    expect(getByText('Overlay text')).toBeTruthy();
  });

  it('applies vertical direction by default (flexDirection column)', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} />
    );

    const gradient = getByTestId('gradient');
    const flatStyle = Array.isArray(gradient.props.style)
      ? Object.assign({}, ...gradient.props.style.filter(Boolean))
      : gradient.props.style;
    expect(flatStyle.flexDirection).toBe('column');
  });

  it('applies horizontal direction when specified', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} direction="horizontal" />
    );

    const gradient = getByTestId('gradient');
    const flatStyle = Array.isArray(gradient.props.style)
      ? Object.assign({}, ...gradient.props.style.filter(Boolean))
      : gradient.props.style;
    expect(flatStyle.flexDirection).toBe('row');
  });

  it('applies custom height', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} height={200} />
    );

    const gradient = getByTestId('gradient');
    const flatStyle = Array.isArray(gradient.props.style)
      ? Object.assign({}, ...gradient.props.style.filter(Boolean))
      : gradient.props.style;
    expect(flatStyle.height).toBe(200);
  });

  it('applies custom borderRadius', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} borderRadius={12} />
    );

    const gradient = getByTestId('gradient');
    const flatStyle = Array.isArray(gradient.props.style)
      ? Object.assign({}, ...gradient.props.style.filter(Boolean))
      : gradient.props.style;
    expect(flatStyle.borderRadius).toBe(12);
  });

  it('renders gradient step views based on steps prop', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} steps={5} />
    );

    const gradient = getByTestId('gradient');
    // The gradient layers container is the first child (absolute fill view)
    const layersContainer = gradient.children[0] as any;
    // steps=5 generates steps 0..5 = 6 gradient steps
    expect(layersContainer.children.length).toBe(6);
  });

  it('applies overflow hidden', () => {
    const { getByTestId } = renderWithTheme(
      <Gradient testID="gradient" colors={['#ff0000', '#0000ff']} />
    );

    const gradient = getByTestId('gradient');
    const flatStyle = Array.isArray(gradient.props.style)
      ? Object.assign({}, ...gradient.props.style.filter(Boolean))
      : gradient.props.style;
    expect(flatStyle.overflow).toBe('hidden');
  });
});

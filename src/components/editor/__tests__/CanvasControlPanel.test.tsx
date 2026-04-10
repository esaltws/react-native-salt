import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import CanvasControlPanel from '../CanvasControlPanel';

const sections = [
  { key: 'fill', title: 'Fill', children: <Text>Fill Options</Text> },
  { key: 'stroke', title: 'Stroke', children: <Text>Stroke Options</Text> },
  { key: 'effects', title: 'Effects', children: <Text>Effect Options</Text>, collapsed: true },
];

describe('CanvasControlPanel', () => {
  it('renders all section titles', () => {
    const { getByText } = renderWithTheme(
      <CanvasControlPanel sections={sections} />
    );
    expect(getByText('Fill')).toBeTruthy();
    expect(getByText('Stroke')).toBeTruthy();
    expect(getByText('Effects')).toBeTruthy();
  });

  it('renders section children when not collapsed', () => {
    const { getByText, queryByText } = renderWithTheme(
      <CanvasControlPanel sections={sections} />
    );
    expect(getByText('Fill Options')).toBeTruthy();
    expect(getByText('Stroke Options')).toBeTruthy();
    // Effects is collapsed
    expect(queryByText('Effect Options')).toBeNull();
  });

  it('calls onToggleSection when a section header is pressed', () => {
    const onToggle = jest.fn();
    const { getByText } = renderWithTheme(
      <CanvasControlPanel sections={sections} onToggleSection={onToggle} />
    );
    fireEvent.press(getByText('Fill'));
    expect(onToggle).toHaveBeenCalledWith('fill');
  });

  it('renders the panel title when provided', () => {
    const { getByText } = renderWithTheme(
      <CanvasControlPanel sections={sections} title="Properties" />
    );
    expect(getByText('Properties')).toBeTruthy();
  });

  it('does not render title when not provided', () => {
    const { queryByText } = renderWithTheme(
      <CanvasControlPanel sections={sections} />
    );
    expect(queryByText('Properties')).toBeNull();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <CanvasControlPanel sections={sections} testID="canvas-panel" />
    );
    expect(getByTestId('canvas-panel')).toBeTruthy();
  });
});

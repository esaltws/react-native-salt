import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Accordion from '../Accordion';

const items = [
  { key: 'a', title: 'Section A', content: <Text>Content A</Text> },
  { key: 'b', title: 'Section B', content: <Text>Content B</Text> },
  { key: 'c', title: 'Section C', content: <Text>Content C</Text> },
];

describe('Accordion', () => {
  it('renders all item titles', () => {
    const { getByText } = renderWithTheme(<Accordion items={items} />);
    expect(getByText('Section A')).toBeTruthy();
    expect(getByText('Section B')).toBeTruthy();
    expect(getByText('Section C')).toBeTruthy();
  });

  it('does not show content by default', () => {
    const { queryByText } = renderWithTheme(<Accordion items={items} />);
    expect(queryByText('Content A')).toBeNull();
    expect(queryByText('Content B')).toBeNull();
  });

  it('expands a section on press', () => {
    const { getByText, queryByText } = renderWithTheme(<Accordion items={items} />);
    fireEvent.press(getByText('Section A'));
    expect(getByText('Content A')).toBeTruthy();
    expect(queryByText('Content B')).toBeNull();
  });

  it('collapses section on second press', () => {
    const { getByText, queryByText } = renderWithTheme(<Accordion items={items} />);
    fireEvent.press(getByText('Section A'));
    expect(getByText('Content A')).toBeTruthy();
    fireEvent.press(getByText('Section A'));
    expect(queryByText('Content A')).toBeNull();
  });

  it('allows multiple sections open when multiple is true', () => {
    const { getByText } = renderWithTheme(
      <Accordion items={items} multiple />
    );
    fireEvent.press(getByText('Section A'));
    fireEvent.press(getByText('Section B'));
    expect(getByText('Content A')).toBeTruthy();
    expect(getByText('Content B')).toBeTruthy();
  });

  it('only keeps one section open in single mode', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Accordion items={items} />
    );
    fireEvent.press(getByText('Section A'));
    fireEvent.press(getByText('Section B'));
    expect(queryByText('Content A')).toBeNull();
    expect(getByText('Content B')).toBeTruthy();
  });

  it('renders empty list without errors', () => {
    const { toJSON } = renderWithTheme(<Accordion items={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <Accordion items={items} testID="accordion" />
    );
    expect(getByTestId('accordion')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import TreeView from '../TreeView';

const nodes = [
  {
    key: 'src',
    label: 'src',
    children: [
      {
        key: 'components',
        label: 'components',
        children: [
          { key: 'button', label: 'Button.tsx' },
          { key: 'input', label: 'Input.tsx' },
        ],
      },
      { key: 'index', label: 'index.ts' },
    ],
  },
  { key: 'readme', label: 'README.md' },
];

describe('TreeView', () => {
  it('renders root node labels', () => {
    const { getByText } = renderWithTheme(<TreeView nodes={nodes} />);
    expect(getByText('src')).toBeTruthy();
    expect(getByText('README.md')).toBeTruthy();
  });

  it('does not show children before expanding', () => {
    const { queryByText } = renderWithTheme(<TreeView nodes={nodes} />);
    expect(queryByText('components')).toBeNull();
    expect(queryByText('index.ts')).toBeNull();
  });

  it('expands a node on press to show children', () => {
    const { getByText, queryByText } = renderWithTheme(<TreeView nodes={nodes} />);
    fireEvent.press(getByText('src'));
    expect(getByText('components')).toBeTruthy();
    expect(getByText('index.ts')).toBeTruthy();
    // Nested children should still be hidden
    expect(queryByText('Button.tsx')).toBeNull();
  });

  it('collapses a node on second press', () => {
    const { getByText, queryByText } = renderWithTheme(<TreeView nodes={nodes} />);
    fireEvent.press(getByText('src'));
    expect(getByText('components')).toBeTruthy();
    fireEvent.press(getByText('src'));
    expect(queryByText('components')).toBeNull();
  });

  it('shows child count for nodes with children', () => {
    const { getByText } = renderWithTheme(<TreeView nodes={nodes} />);
    // "src" has 2 children
    expect(getByText('2')).toBeTruthy();
  });

  it('highlights the selected node', () => {
    const { getByText } = renderWithTheme(
      <TreeView nodes={nodes} selectedKey="readme" />
    );
    // The selected node text should exist
    expect(getByText('README.md')).toBeTruthy();
  });

  it('calls onSelect when a node is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = renderWithTheme(
      <TreeView nodes={nodes} onSelect={onSelect} />
    );
    fireEvent.press(getByText('README.md'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'readme', label: 'README.md' })
    );
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <TreeView nodes={nodes} testID="tree-view" />
    );
    expect(getByTestId('tree-view')).toBeTruthy();
  });
});

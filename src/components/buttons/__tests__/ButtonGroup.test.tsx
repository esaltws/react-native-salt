import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import ButtonGroup from '../ButtonGroup';

describe('ButtonGroup', () => {
  const items = [
    { key: 'left', label: 'Left' },
    { key: 'center', label: 'Center' },
    { key: 'right', label: 'Right' },
  ];
  const onSelect = jest.fn();

  beforeEach(() => {
    onSelect.mockClear();
  });

  // ── Renders multiple buttons ───────────────────────────────────────
  it('renders all item labels', () => {
    const { getByText } = renderWithTheme(
      <ButtonGroup items={items} selected="left" onSelect={onSelect} testID="group" />
    );
    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Center')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
  });

  it('renders the container with testID', () => {
    const { getByTestId } = renderWithTheme(
      <ButtonGroup items={items} selected="left" onSelect={onSelect} testID="group" />
    );
    expect(getByTestId('group')).toBeTruthy();
  });

  it('calls onSelect with the correct key when a button is pressed', () => {
    const { getByText } = renderWithTheme(
      <ButtonGroup items={items} selected="left" onSelect={onSelect} testID="group" />
    );
    fireEvent.press(getByText('Center'));
    expect(onSelect).toHaveBeenCalledWith('center');
  });

  // ── Selected state styling ─────────────────────────────────────────
  describe('selected state styling', () => {
    it('selected button has accent color background', () => {
      const { getByLabelText } = renderWithTheme(
        <ButtonGroup items={items} selected="center" onSelect={onSelect} intent="primary" />
      );
      const selectedBtn = getByLabelText('Center');
      const flatStyle = Object.assign({}, ...([].concat(selectedBtn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('#2563eb'); // primary color
    });

    it('unselected button has transparent background', () => {
      const { getByLabelText } = renderWithTheme(
        <ButtonGroup items={items} selected="center" onSelect={onSelect} intent="primary" />
      );
      const unselectedBtn = getByLabelText('Left');
      const flatStyle = Object.assign({}, ...([].concat(unselectedBtn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.backgroundColor).toBe('transparent');
    });

    it('selected button text uses onPrimary color', () => {
      const { getByText } = renderWithTheme(
        <ButtonGroup items={items} selected="center" onSelect={onSelect} intent="primary" />
      );
      const selectedText = getByText('Center');
      const flatStyle = Object.assign({}, ...([].concat(selectedText.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.color).toBe('#ffffff'); // onPrimary
    });

    it('unselected button text uses accent color', () => {
      const { getByText } = renderWithTheme(
        <ButtonGroup items={items} selected="center" onSelect={onSelect} intent="primary" />
      );
      const unselectedText = getByText('Left');
      const flatStyle = Object.assign({}, ...([].concat(unselectedText.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.color).toBe('#2563eb'); // primary
    });
  });

  // ── Multi-select mode ──────────────────────────────────────────────
  describe('multiple selection', () => {
    it('supports array of selected keys', () => {
      const { getByLabelText } = renderWithTheme(
        <ButtonGroup items={items} selected={['left', 'right']} onSelect={onSelect} multiple />
      );
      const leftBtn = getByLabelText('Left');
      const leftStyle = Object.assign({}, ...([].concat(leftBtn.props.style).flat(Infinity).filter(Boolean)));
      expect(leftStyle.backgroundColor).toBe('#2563eb');

      const rightBtn = getByLabelText('Right');
      const rightStyle = Object.assign({}, ...([].concat(rightBtn.props.style).flat(Infinity).filter(Boolean)));
      expect(rightStyle.backgroundColor).toBe('#2563eb');

      const centerBtn = getByLabelText('Center');
      const centerStyle = Object.assign({}, ...([].concat(centerBtn.props.style).flat(Infinity).filter(Boolean)));
      expect(centerStyle.backgroundColor).toBe('transparent');
    });
  });

  // ── Disabled item ──────────────────────────────────────────────────
  describe('disabled item', () => {
    it('disabled item has reduced opacity', () => {
      const itemsWithDisabled = [
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B', disabled: true },
      ];
      const { getByLabelText } = renderWithTheme(
        <ButtonGroup items={itemsWithDisabled} selected="a" onSelect={onSelect} />
      );
      const disabledBtn = getByLabelText('B');
      const flatStyle = Object.assign({}, ...([].concat(disabledBtn.props.style).flat(Infinity).filter(Boolean)));
      expect(flatStyle.opacity).toBe(0.4);
    });

    it('disabled item does not call onSelect', () => {
      const itemsWithDisabled = [
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B', disabled: true },
      ];
      const { getByLabelText } = renderWithTheme(
        <ButtonGroup items={itemsWithDisabled} selected="a" onSelect={onSelect} />
      );
      fireEvent.press(getByLabelText('B'));
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('disabled item has accessibilityState.disabled true', () => {
      const itemsWithDisabled = [
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B', disabled: true },
      ];
      const { getByLabelText } = renderWithTheme(
        <ButtonGroup items={itemsWithDisabled} selected="a" onSelect={onSelect} />
      );
      expect(getByLabelText('B').props.accessibilityState.disabled).toBe(true);
    });
  });

  // ── Accessibility ──────────────────────────────────────────────────
  it('each button has accessibilityRole button', () => {
    const { getByLabelText } = renderWithTheme(
      <ButtonGroup items={items} selected="left" onSelect={onSelect} />
    );
    expect(getByLabelText('Left').props.accessibilityRole).toBe('button');
    expect(getByLabelText('Center').props.accessibilityRole).toBe('button');
    expect(getByLabelText('Right').props.accessibilityRole).toBe('button');
  });

  it('selected button has accessibilityState.selected true', () => {
    const { getByLabelText } = renderWithTheme(
      <ButtonGroup items={items} selected="center" onSelect={onSelect} />
    );
    expect(getByLabelText('Center').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('Left').props.accessibilityState.selected).toBe(false);
  });

  // ── fullWidth ──────────────────────────────────────────────────────
  it('fullWidth applies width 100% to container', () => {
    const { getByTestId } = renderWithTheme(
      <ButtonGroup items={items} selected="left" onSelect={onSelect} fullWidth testID="group" />
    );
    const container = getByTestId('group');
    const flatStyle = Object.assign({}, ...([].concat(container.props.style).flat(Infinity).filter(Boolean)));
    expect(flatStyle.width).toBe('100%');
  });

  // ── Icon items ─────────────────────────────────────────────────────
  it('renders items with icons', () => {
    const iconItems = [
      { key: 'search', label: 'Search', icon: 'search' },
      { key: 'add', label: 'Add', icon: 'add' },
    ];
    const { getByText } = renderWithTheme(
      <ButtonGroup items={iconItems} selected="search" onSelect={onSelect} />
    );
    // search maps to search-outline in ICON_MAP, mocked Ionicons renders text
    expect(getByText('search-outline')).toBeTruthy();
    expect(getByText('add')).toBeTruthy();
  });
});

import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import ScreenHeader from '../ScreenHeader';

describe('ScreenHeader', () => {
  it('renders the title text', () => {
    const { getByText } = renderWithTheme(
      <ScreenHeader title="Settings" />
    );

    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders the subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <ScreenHeader title="Settings" subtitle="App preferences" />
    );

    expect(getByText('App preferences')).toBeTruthy();
  });

  it('renders the back button and fires onBack when pressed', () => {
    const onBack = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <ScreenHeader title="Settings" onBack={onBack} />
    );

    const backButton = getByLabelText('Go back');
    expect(backButton).toBeTruthy();

    fireEvent.press(backButton);
    expect(onBack).toHaveBeenCalled();
  });

  it('does not render back button when onBack is not provided', () => {
    const { queryByLabelText } = renderWithTheme(
      <ScreenHeader title="Home" />
    );

    expect(queryByLabelText('Go back')).toBeNull();
  });

  it('renders right action buttons', () => {
    const onAction = jest.fn();
    const actions = [
      { icon: 'search', onPress: onAction },
    ];

    const { getByLabelText } = renderWithTheme(
      <ScreenHeader title="Home" actions={actions} />
    );

    const actionBtn = getByLabelText('search');
    expect(actionBtn).toBeTruthy();

    fireEvent.press(actionBtn);
    expect(onAction).toHaveBeenCalled();
  });

  it('renders multiple right action buttons', () => {
    const actions = [
      { icon: 'search', onPress: jest.fn() },
      { icon: 'notifications', onPress: jest.fn() },
    ];

    const { getByLabelText } = renderWithTheme(
      <ScreenHeader title="Home" actions={actions} />
    );

    expect(getByLabelText('search')).toBeTruthy();
    expect(getByLabelText('notifications')).toBeTruthy();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <ScreenHeader title="Home" testID="screen-header" />
    );

    expect(getByTestId('screen-header')).toBeTruthy();
  });
});

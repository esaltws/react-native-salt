import React from 'react';
import { Text } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import SectionHeader from '../SectionHeader';

describe('SectionHeader', () => {
  it('renders title text', () => {
    const { getByText } = renderWithTheme(
      <SectionHeader title="My Section" />
    );

    expect(getByText('My Section')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = renderWithTheme(
      <SectionHeader title="My Section" subtitle="A description" />
    );

    expect(getByText('A description')).toBeTruthy();
  });

  it('renders action button when actionText and onActionPress are provided', () => {
    const onActionPress = jest.fn();
    const { getByText } = renderWithTheme(
      <SectionHeader title="My Section" actionText="See All" onActionPress={onActionPress} />
    );

    const actionButton = getByText('See All');
    expect(actionButton).toBeTruthy();
    fireEvent.press(actionButton);
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when only actionText is provided without onActionPress', () => {
    const { queryByText } = renderWithTheme(
      <SectionHeader title="My Section" actionText="See All" />
    );

    // When collapsible is false and onActionPress is not provided, the action button is not rendered
    // The title should be there but action should not render as a Button
    expect(queryByText('See All')).toBeNull();
  });

  it('applies testID', () => {
    const { getByTestId } = renderWithTheme(
      <SectionHeader title="Section" testID="section-header" />
    );

    expect(getByTestId('section-header')).toBeTruthy();
  });

  it('renders as collapsible when collapsible is true', () => {
    const { getByRole } = renderWithTheme(
      <SectionHeader title="Collapsible" collapsible>
        <Text>Collapsed content</Text>
      </SectionHeader>
    );

    // The header row should be wrapped in a Pressable with role="button"
    const button = getByRole('button');
    expect(button).toBeTruthy();
  });

  it('shows children when collapsible and not collapsed', () => {
    const { getByText } = renderWithTheme(
      <SectionHeader title="Section" collapsible defaultCollapsed={false}>
        <Text>Expandable content</Text>
      </SectionHeader>
    );

    expect(getByText('Expandable content')).toBeTruthy();
  });

  it('hides children when collapsible and defaultCollapsed is true', () => {
    const { queryByText } = renderWithTheme(
      <SectionHeader title="Section" collapsible defaultCollapsed>
        <Text>Expandable content</Text>
      </SectionHeader>
    );

    expect(queryByText('Expandable content')).toBeNull();
  });
});

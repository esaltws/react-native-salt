import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import Timeline from '../Timeline';

const mockEvents = [
  { key: '1', title: 'Order Placed', description: 'Your order has been placed' },
  { key: '2', title: 'Shipped', description: 'Package is on the way' },
  { key: '3', title: 'Delivered', description: 'Package delivered' },
];

describe('Timeline', () => {
  it('renders all event titles', () => {
    const { getByText } = renderWithTheme(
      <Timeline events={mockEvents} />
    );

    expect(getByText('Order Placed')).toBeTruthy();
    expect(getByText('Shipped')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('renders event descriptions', () => {
    const { getByText } = renderWithTheme(
      <Timeline events={mockEvents} />
    );

    expect(getByText('Your order has been placed')).toBeTruthy();
    expect(getByText('Package is on the way')).toBeTruthy();
  });

  it('renders timestamps when provided', () => {
    const eventsWithTime = [
      { key: '1', title: 'Step 1', timestamp: '10:00 AM' },
      { key: '2', title: 'Step 2', timestamp: '11:00 AM' },
    ];

    const { getByText } = renderWithTheme(
      <Timeline events={eventsWithTime} />
    );

    expect(getByText('10:00 AM')).toBeTruthy();
    expect(getByText('11:00 AM')).toBeTruthy();
  });

  it('renders with intent color events', () => {
    const eventsWithIntent = [
      { key: '1', title: 'Success', intent: 'success' as const },
      { key: '2', title: 'Error', intent: 'danger' as const },
    ];

    const { getByText } = renderWithTheme(
      <Timeline events={eventsWithIntent} />
    );

    expect(getByText('Success')).toBeTruthy();
    expect(getByText('Error')).toBeTruthy();
  });

  it('renders with showConnector set to false', () => {
    const { getByText } = renderWithTheme(
      <Timeline events={mockEvents} showConnector={false} />
    );

    // Should still render all events
    expect(getByText('Order Placed')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('applies testID to the container', () => {
    const { getByTestId } = renderWithTheme(
      <Timeline events={mockEvents} testID="timeline" />
    );

    expect(getByTestId('timeline')).toBeTruthy();
  });
});

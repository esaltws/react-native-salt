import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import OnboardingSlide from '../OnboardingSlide';

describe('OnboardingSlide', () => {
  it('renders title and description', () => {
    const { getByText } = renderWithTheme(
      <OnboardingSlide title="Welcome" description="Get started with our app" />
    );
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Get started with our app')).toBeTruthy();
  });

  it('renders action button when actionLabel and onAction are provided', () => {
    const onAction = jest.fn();
    const { getByText } = renderWithTheme(
      <OnboardingSlide
        title="Step 1"
        description="Setup"
        actionLabel="Next"
        onAction={onAction}
      />
    );
    const button = getByText('Next');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders skip button when onSkip is provided', () => {
    const onSkip = jest.fn();
    const { getByText } = renderWithTheme(
      <OnboardingSlide
        title="Welcome"
        description="Intro"
        onSkip={onSkip}
      />
    );
    const skipButton = getByText('Skip');
    expect(skipButton).toBeTruthy();
    fireEvent.press(skipButton);
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('renders custom skip label', () => {
    const { getByText } = renderWithTheme(
      <OnboardingSlide
        title="Welcome"
        description="Intro"
        onSkip={jest.fn()}
        skipLabel="Not now"
      />
    );
    expect(getByText('Not now')).toBeTruthy();
  });

  it('renders step dots when step and totalSteps are provided', () => {
    const { toJSON } = renderWithTheme(
      <OnboardingSlide
        title="Welcome"
        description="Intro"
        step={1}
        totalSteps={3}
      />
    );
    // 3 dots should be rendered: step dots have height: 8
    const tree = JSON.stringify(toJSON());
    // Count occurrences of borderRadius: 4 (dots) - each dot has borderRadius: 4
    const dotMatches = tree.match(/"borderRadius":4/g);
    expect(dotMatches).toBeTruthy();
    expect(dotMatches!.length).toBe(3);
  });

  it('does not render dots when totalSteps is 1', () => {
    const { toJSON } = renderWithTheme(
      <OnboardingSlide
        title="Welcome"
        description="Intro"
        step={0}
        totalSteps={1}
      />
    );
    const tree = JSON.stringify(toJSON());
    // Only 1 step, so dots should not render (totalSteps > 1 check)
    // borderRadius:4 from dots should not appear
    const dotMatches = tree.match(/"borderRadius":4/g);
    expect(dotMatches).toBeNull();
  });

  it('applies testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <OnboardingSlide title="Test" description="Desc" testID="slide" />
    );
    expect(getByTestId('slide')).toBeTruthy();
  });
});

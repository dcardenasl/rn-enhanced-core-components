import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import CustomButton from './index';

describe('CustomButton', () => {
  test('renders children correctly', () => {
    const {getByText} = render(
      <CustomButton onPress={() => {}}>
        <Text>Test Button</Text>
      </CustomButton>,
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  test('handles onPress event', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton onPress={onPressMock}>
        <Text>Test Button</Text>
      </CustomButton>,
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('displays a loader when loading', () => {
    const {getByTestId} = render(
      <CustomButton onPress={() => {}} loading>
        <Text>Test Button</Text>
      </CustomButton>,
    );
    expect(getByTestId('loader')).toBeTruthy();
  });

  test('is disabled when loading', () => {
    const onPressMock = jest.fn();
    const {queryByText, getByTestId} = render(
      <CustomButton loading onPress={onPressMock}>
        <Text>Test Button</Text>
      </CustomButton>,
    );

    const activityIndicator = getByTestId('loader');
    expect(activityIndicator).toBeTruthy();

    const buttonText = queryByText('Test Button');
    expect(buttonText).toBeNull();

    if (buttonText) {
      fireEvent.press(buttonText);
    }
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });

  test('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton disabled onPress={onPressMock}>
        <Text>Test Button</Text>
      </CustomButton>,
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });

  test('applies style prop', () => {
    const {toJSON} = render(
      <CustomButton style={{borderRadius: 10}}>
        <Text>Styled</Text>
      </CustomButton>,
    );
    const tree = toJSON();
    const flatStyle = Array.isArray(tree?.props.style)
      ? Object.assign({}, ...tree.props.style)
      : tree?.props.style;
    expect(flatStyle.borderRadius).toBe(10);
  });

  test('applies backgroundColor prop', () => {
    const {toJSON} = render(
      <CustomButton backgroundColor="blue">
        <Text>Blue</Text>
      </CustomButton>,
    );
    const tree = toJSON();
    const flatStyle = Array.isArray(tree?.props.style)
      ? Object.assign({}, ...tree.props.style)
      : tree?.props.style;
    expect(flatStyle.backgroundColor).toBe('blue');
  });

  test('applies grey background when disabled', () => {
    const {toJSON} = render(
      <CustomButton disabled backgroundColor="blue">
        <Text>Disabled</Text>
      </CustomButton>,
    );
    const tree = toJSON();
    const flatStyle = Array.isArray(tree?.props.style)
      ? Object.assign({}, ...tree.props.style)
      : tree?.props.style;
    expect(flatStyle.backgroundColor).toBe('grey');
  });

  test('renders without onPress (noop default)', () => {
    const {getByText} = render(
      <CustomButton>
        <Text>No Handler</Text>
      </CustomButton>,
    );
    expect(() => fireEvent.press(getByText('No Handler'))).not.toThrow();
  });

  test('has accessibilityRole="button"', () => {
    const {toJSON} = render(
      <CustomButton>
        <Text>A11y</Text>
      </CustomButton>,
    );
    expect(toJSON()?.props.accessibilityRole).toBe('button');
  });

  test('sets accessibilityState.disabled when disabled', () => {
    const {toJSON} = render(
      <CustomButton disabled>
        <Text>Disabled</Text>
      </CustomButton>,
    );
    expect(toJSON()?.props.accessibilityState.disabled).toBe(true);
  });

  test('sets accessibilityState.busy when loading', () => {
    const {toJSON} = render(
      <CustomButton loading>
        <Text>Loading</Text>
      </CustomButton>,
    );
    expect(toJSON()?.props.accessibilityState.busy).toBe(true);
  });

  test('passes through accessibilityLabel', () => {
    const {toJSON} = render(
      <CustomButton accessibilityLabel="Submit form">
        <Text>Submit</Text>
      </CustomButton>,
    );
    expect(toJSON()?.props.accessibilityLabel).toBe('Submit form');
  });

  test('passes through accessibilityHint', () => {
    const {toJSON} = render(
      <CustomButton accessibilityHint="Submits the registration form">
        <Text>Submit</Text>
      </CustomButton>,
    );
    expect(toJSON()?.props.accessibilityHint).toBe(
      'Submits the registration form',
    );
  });

  test('passes through testID', () => {
    const {getByTestId} = render(
      <CustomButton testID="my-button">
        <Text>Test</Text>
      </CustomButton>,
    );
    expect(getByTestId('my-button')).toBeTruthy();
  });
});

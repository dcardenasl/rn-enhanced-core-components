import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ViewStyle,
  ColorValue,
  StyleProp,
} from 'react-native';

export interface CustomButtonProps {
  /** The content to render inside the button. */
  children: ReactNode;
  /** Function to execute when the button is pressed. */
  onPress?: () => void;
  /** Whether the button should be disabled. */
  disabled?: boolean;
  /** Optional custom styles for the button container. */
  style?: StyleProp<ViewStyle>;
  /** Whether the button is in a loading state. */
  loading?: boolean;
  /** Optional color for the button background. */
  backgroundColor?: ColorValue;
  /** Accessibility label describing the button's purpose. */
  accessibilityLabel?: string;
  /** Accessibility hint providing additional context. */
  accessibilityHint?: string;
  /** Test identifier for end-to-end testing. */
  testID?: string;
}

const noop = () => {};

const CustomButton = ({
  children,
  style,
  disabled,
  loading,
  backgroundColor,
  onPress = noop,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: CustomButtonProps) => {
  const btnStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disabled ? 'grey' : backgroundColor,
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={({pressed}) => [btnStyle, pressed && {opacity: 0.6}, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{disabled: !!disabled, busy: !!loading}}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}>
      {loading ? (
        <ActivityIndicator
          testID="loader"
          animating={loading}
          size="large"
          color={'white'}
        />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default CustomButton;

import React, {FC, ReactNode} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
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
}

const noop = () => {};

const CustomButton: FC<CustomButtonProps> = ({
  children,
  style,
  disabled,
  loading,
  backgroundColor,
  onPress = noop,
}) => {
  const btnStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disabled ? 'grey' : backgroundColor,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled || loading}
      style={[btnStyle, style]}
      onPress={onPress}>
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
    </TouchableOpacity>
  );
};

export default CustomButton;

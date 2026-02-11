import React, {
  useRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
  useState,
} from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  Modal,
  ViewStyle,
  useWindowDimensions,
  StyleProp,
  ColorValue,
} from 'react-native';

export type CustomModalProps = {
  /** The content to be rendered inside the modal. */
  children?: ReactNode;
  /** Whether the modal should close when the user clicks outside of it. */
  closeOutside?: boolean;
  /** The background color of the modal content area. */
  backgroundColor?: ColorValue;
  /** The direction from which the modal should slide in. */
  slideDirection?: 'up' | 'left' | 'right' | 'down';
  /** Custom styles to apply to the modal content. */
  customContentStyle?: StyleProp<ViewStyle>;
  /** Callback fired after the open animation starts. */
  onOpen?: () => void;
  /** Callback fired after the close animation completes. */
  onClose?: () => void;
  /** Accessibility label for the modal content area. */
  accessibilityLabel?: string;
};

type directionsDurationTypes = {
  left: number;
  right: number;
  down: number;
  up: number;
};

interface SlideAnimationsTypes {
  left: Animated.WithAnimatedValue<ViewStyle>;
  right: Animated.WithAnimatedValue<ViewStyle>;
  up: Animated.WithAnimatedValue<ViewStyle>;
  down: Animated.WithAnimatedValue<ViewStyle>;
}

export type RefModalObject = {
  open: () => void;
  close: () => void;
};

const durationAnimationsAtOpen: directionsDurationTypes = {
  left: 300,
  right: 300,
  down: 500,
  up: 500,
};

const durationAnimationsAtClose: directionsDurationTypes = {
  left: 200,
  right: 200,
  down: 360,
  up: 360,
};

function CustomModal({
  children,
  closeOutside = true,
  backgroundColor = 'white',
  slideDirection = 'up',
  customContentStyle,
  onOpen,
  onClose,
  accessibilityLabel,
  ref,
}: CustomModalProps & {ref?: React.Ref<RefModalObject>}) {
  const {width, height} = useWindowDimensions();
  const [visible, setVisible] = useState<boolean>(false);
  const animation = useRef(new Animated.Value(0)).current;

  const handleAnimationAtOpenModal = useCallback(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: durationAnimationsAtOpen[slideDirection],
      useNativeDriver: true,
    }).start(() => {
      onOpen?.();
    });
  }, [animation, slideDirection, onOpen]);

  const handleAnimationAtCloseModal = useCallback(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: durationAnimationsAtClose[slideDirection],
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose?.();
    });
  }, [animation, slideDirection, onClose]);

  const open = useCallback(() => {
    setVisible(true);
    handleAnimationAtOpenModal();
  }, [handleAnimationAtOpenModal]);

  const close = useCallback(() => {
    handleAnimationAtCloseModal();
  }, [handleAnimationAtCloseModal]);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  useEffect(() => {
    return () => {
      animation.stopAnimation();
    };
  }, [animation]);

  const slideAnimations = useMemo<SlideAnimationsTypes>(
    () => ({
      up: {
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [height, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
      down: {
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-height, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
      left: {
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [width, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
      right: {
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-width, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    }),
    [animation, width, height],
  );

  const bodyContentStyles = useMemo<StyleProp<ViewStyle>>(
    () => ({
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 50,
      padding: 20,
      backgroundColor,
      borderRadius: 20,
      maxHeight: height,
    }),
    [backgroundColor, height],
  );

  return (
    <Modal
      testID="customModal"
      animationType="fade"
      supportedOrientations={['portrait', 'landscape']}
      transparent={true}
      visible={visible}
      onRequestClose={close}
      accessibilityViewIsModal={true}
      style={[stylesCustomModal.contentModal]}>
      <Pressable
        style={stylesCustomModal.outsidePressable}
        disabled={!closeOutside}
        onPressOut={close}
        testID="outsidePressable">
        <Pressable>
          <Animated.View
            style={[
              slideAnimations[slideDirection],
              bodyContentStyles,
              customContentStyle,
            ]}
            accessibilityLabel={accessibilityLabel}
            testID="animatedView">
            {children}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const stylesCustomModal = StyleSheet.create({
  contentModal: {
    flex: 1,
  },
  outsidePressable: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
});

export default CustomModal;

import React from 'react';
import { Pressable, Animated, ViewProps } from 'react-native';

interface TouchableScaleProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  scale?: number;
}

export const TouchableScale = ({
  children,
  onPress,
  scale = 0.98,
  ...props
}: TouchableScaleProps) => {
  const animated = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(animated, {
      toValue: scale,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View
        style={[
          props.style,
          {
            transform: [{ scale: animated }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}; 
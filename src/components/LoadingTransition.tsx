import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';

interface Props {
  message: string;
  subMessage?: string;
}

export const LoadingTransition = ({ message, subMessage }: Props) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <LottieView
          source={{
            uri: 'https://assets10.lottiefiles.com/packages/lf20_qjosmr4w.json'
            // This is an orange circular loading animation
            // Alternative orange loaders:
            // 'https://assets2.lottiefiles.com/packages/lf20_yriifcr1.json'
            // 'https://assets5.lottiefiles.com/packages/lf20_quspqbvj.json'
          }}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.message}>{message}</Text>
        {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  message: {
    ...createTextStyle('h2', 'primary', 'bold'),
    color: '#FF4D00',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  subMessage: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const logoScale = new Animated.Value(0.3);
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1500),
    ]).start(() => onFinish());
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary.main, colors.primary.light]}
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
}); 
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  value: number;
  radius: number;
  strokeWidth: number;
  color: string;
  children?: React.ReactNode;
}

export const CircularProgress = ({ value, radius, strokeWidth, color, children }: Props) => {
  const circumference = 2 * Math.PI * radius;
  const progressValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularProgress; 
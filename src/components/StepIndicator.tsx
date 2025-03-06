import React from 'react';
import { View, Text, StyleSheet, Animated, Platform, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { LinearGradient } from 'expo-linear-gradient';

interface Step {
  title: string;
  icon: string;
  description: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
  progress: number;
  onStepPress?: (index: number) => void;
}

export const StepIndicator = ({ steps, currentStep, progress, onStepPress }: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', '#FFF']}
        style={styles.gradient}
      >
        <Animated.View 
          style={[
            styles.progressBar,
            { width: `${progress}%` }
          ]}
        />
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <TouchableOpacity 
              key={step.title}
              style={styles.stepColumn}
              onPress={() => {
                if (index < currentStep && onStepPress) {
                  onStepPress(index);
                }
              }}
              disabled={index >= currentStep}
            >
              <View 
                style={[
                  styles.step,
                  index <= currentStep && styles.stepActive,
                  index === currentStep && styles.stepCurrent
                ]}
              >
                <View style={[
                  styles.iconContainer, 
                  index <= currentStep && styles.iconContainerActive,
                  index === currentStep && styles.iconContainerCurrent
                ]}>
                  <MaterialCommunityIcons
                    name={step.icon}
                    size={24}
                    color={index <= currentStep ? '#FFF' : colors.text.secondary}
                  />
                </View>
                <Text style={[
                  styles.stepText,
                  index <= currentStep && styles.stepTextActive,
                  index === currentStep && styles.stepTextCurrent
                ]}>
                  {step.title}
                </Text>
                <Text style={styles.stepDescription}>
                  {step.description}
                </Text>
              </View>
              {index < steps.length - 1 && (
                <View style={[
                  styles.connector,
                  index < currentStep && styles.connectorActive
                ]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingTop: Platform.OS === 'ios' ? 60 : 36,
    marginBottom: 8,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  progressBar: {
    position: 'absolute',
    top: 36,
    left: 40,
    height: 2,
    backgroundColor: colors.primary.main,
    borderRadius: 1,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stepColumn: {
    alignItems: 'center',
    flex: 1,
  },
  step: {
    alignItems: 'center',
    opacity: 0.5,
  },
  stepActive: {
    opacity: 1,
  },
  stepCurrent: {
    transform: [{scale: 1.05}],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconContainerActive: {
    backgroundColor: colors.primary.main,
  },
  iconContainerCurrent: {
    backgroundColor: colors.primary.dark,
  },
  stepText: {
    ...createTextStyle('caption', 'primary', 'medium'),
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 11,
  },
  stepTextActive: {
    color: colors.text.primary,
  },
  stepTextCurrent: {
    color: colors.primary.dark,
  },
  stepDescription: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 9,
    marginTop: 1,
    maxWidth: 70,
  },
  connector: {
    width: '100%',
    height: 2,
    backgroundColor: '#F0F0F0',
    position: 'absolute',
    top: 20,
    left: '50%',
    zIndex: -1,
  },
  connectorActive: {
    backgroundColor: colors.primary.main,
  },
}); 
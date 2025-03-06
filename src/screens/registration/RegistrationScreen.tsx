import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StepIndicator } from '../../components/StepIndicator';
import { colors } from '../../theme/colors';

interface Props {
  onFinish: () => void;
}

export const RegistrationScreen = ({ onFinish }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepPress = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        steps={REGISTRATION_STEPS}
        currentStep={currentStep}
        progress={(currentStep / (REGISTRATION_STEPS.length - 1)) * 100}
        onStepPress={handleStepPress}
      />
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
  },
}); 
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BusinessInfoScreen } from './registration/BusinessInfoScreen';
import { PersonalInfoScreen } from './registration/PersonalInfoScreen';
import { BusinessHoursScreen } from './registration/BusinessHoursScreen';
import { ShopVerificationScreen } from './registration/ShopVerificationScreen';
import { StepIndicator } from '../components/StepIndicator';
import { LoadingTransition } from '../components/LoadingTransition';
import { colors } from '../theme/colors';
import {
  BusinessInfo,
  PersonalInfo,
  BusinessHours,
  ShopVerification,
} from '../types/registration';

const REGISTRATION_STEPS = [
  { 
    title: 'Business', 
    icon: 'store',
    description: 'Store details'
  },
  { 
    title: 'Personal', 
    icon: 'account',
    description: 'Your info'
  },
  { 
    title: 'Hours', 
    icon: 'clock',
    description: 'Operating time'
  },
  { 
    title: 'Verify', 
    icon: 'shield-check',
    description: 'Documents'
  },
];

interface Props {
  onFinish: () => void;
}

export const RegistrationScreen = ({ onFinish }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [formData, setFormData] = useState({
    business: null as BusinessInfo | null,
    personal: null as PersonalInfo | null,
    hours: null as BusinessHours | null,
    verification: null as ShopVerification | null,
  });

  const showLoadingTransition = async (message: string, duration: number = 2000) => {
    setLoadingMessage(message);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsLoading(false);
  };

  const handleStepComplete = async (data: any) => {
    const messages = [
      'Saving business information...',
      'Verifying personal details...',
      'Setting up business hours...',
      'Submitting verification documents...',
    ];

    await showLoadingTransition(messages[currentStep]);

    setFormData(prev => ({
      ...prev,
      [Object.keys(prev)[currentStep]]: data,
    }));

    if (currentStep < REGISTRATION_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await showLoadingTransition('Completing registration...', 3000);
      onFinish();
    }
  };

  if (isLoading) {
    return (
      <LoadingTransition 
        message={loadingMessage}
        progress={(currentStep / REGISTRATION_STEPS.length) * 100}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInfoScreen onNext={handleStepComplete} />;
      case 1:
        return <PersonalInfoScreen onNext={handleStepComplete} />;
      case 2:
        return <BusinessHoursScreen onNext={handleStepComplete} />;
      case 3:
        return <ShopVerificationScreen onNext={handleStepComplete} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        steps={REGISTRATION_STEPS}
        currentStep={currentStep}
        progress={(currentStep / (REGISTRATION_STEPS.length - 1)) * 100}
      />
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
}); 
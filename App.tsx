import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/theme/colors';
import { typography, createTextStyle } from './src/theme/typography';
import { Card } from './src/components/Card';
import { TouchableScale } from './src/components/TouchableScale';
import { buttonStyles } from './src/theme/buttons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoadingTransition } from './src/components/LoadingTransition';
import { SignInScreen } from './src/screens/SignInScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [fontsLoaded] = useFonts({
    'Poppins-400': Poppins_400Regular,
    'Poppins-500': Poppins_500Medium,
    'Poppins-700': Poppins_700Bold,
    'Roboto-400': Roboto_400Regular,
    'Roboto-500': Roboto_500Medium,
    'Roboto-700': Roboto_700Bold,
  });

  const showLoadingTransition = async (message: string, duration: number = 2000) => {
    setLoadingMessage(message);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsLoading(false);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setShowRegistration(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <LoadingTransition message={loadingMessage} />;
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
  }

  if (!isAuthenticated && !showRegistration) {
    return <SignInScreen onSignIn={handleSignIn} onRegister={handleRegister} />;
  }

  if (showRegistration) {
    return <RegistrationScreen onFinish={() => {
      setShowRegistration(false);
      setIsAuthenticated(true);
    }} />;
  }

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  welcomeText: {
    ...createTextStyle('h1', 'primary', 'bold'),
    color: colors.text.primary,
    marginBottom: 24,
  },
});

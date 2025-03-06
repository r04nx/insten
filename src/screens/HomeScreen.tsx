import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { Card } from '../components/Card';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.welcomeText}>Welcome to Insten!</Text>
        <Text style={styles.subtitle}>Your registration is complete.</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: 16,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    padding: 24,
  },
  welcomeText: {
    ...createTextStyle('h1', 'primary', 'bold'),
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
}); 
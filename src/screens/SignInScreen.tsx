import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { TouchableScale } from '../components/TouchableScale';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { LoadingTransition } from '../components/LoadingTransition';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  onSignIn: () => void;
  onRegister: () => void;
}

// Hardcoded credentials for testing
const TEST_CREDENTIALS = {
  mobile: '1234',
  password: '1234'
};

const STORAGE_KEY = 'remembered_credentials';

const { height } = Dimensions.get('window');

export const SignInScreen = ({ onSignIn, onRegister }: Props) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const validateCredentials = () => {
    if (!mobile || !password) {
      setError('Please enter both mobile number and password');
      return false;
    }
    
    if (mobile === TEST_CREDENTIALS.mobile && password === TEST_CREDENTIALS.password) {
      setError(null);
      return true;
    } else {
      setError('Invalid credentials. Use 1234 for both mobile and password.');
      return false;
    }
  };

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedCredentials) {
        const { mobile: savedMobile, password: savedPassword } = JSON.parse(savedCredentials);
        setMobile(savedMobile);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const handleSignIn = async () => {
    if (validateCredentials()) {
      setIsLoading(true);
      try {
        if (rememberMe) {
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ mobile, password })
          );
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        onSignIn();
      } catch (error) {
        console.error('Error saving credentials:', error);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingTransition message="Signing you in..." />;
  }

  return (
    <ImageBackground
      source={{ 
        uri: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1200'
      }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.header}>
            <MaterialCommunityIcons 
              name="store" 
              size={48} 
              color="#FFF"
            />
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>Sign in to your store account</Text>
          </View>

          <Card style={styles.card}>
            {error && (
              <Text style={styles.errorMessage}>{error}</Text>
            )}
            
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons 
                name="phone" 
                size={20} 
                color={colors.primary.main}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number (1234)"
                placeholderTextColor={colors.text.secondary}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons 
                name="lock" 
                size={20} 
                color={colors.primary.main}
              />
              <TextInput
                style={styles.input}
                placeholder="Password (1234)"
                placeholderTextColor={colors.text.secondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableScale onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={colors.text.secondary}
                />
              </TouchableScale>
            </View>

            <View style={styles.rememberMeContainer}>
              <TouchableScale onPress={() => setRememberMe(!rememberMe)}>
                <View style={styles.checkboxRow}>
                  <MaterialCommunityIcons
                    name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"}
                    size={24}
                    color={colors.primary.main}
                  />
                  <Text style={styles.rememberMeText}>Remember Me</Text>
                </View>
              </TouchableScale>
            </View>

            <TouchableScale onPress={() => Alert.alert('Hint', 'Use 1234 as password')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableScale>

            <TouchableScale onPress={handleSignIn}>
              <LinearGradient
                colors={[colors.primary.main, colors.primary.dark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signInButton}
              >
                <Text style={styles.buttonText}>Sign In</Text>
                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={20} 
                  color="#FFF"
                />
              </LinearGradient>
            </TouchableScale>

            <TouchableScale onPress={onRegister}>
              <View style={styles.registerButton}>
                <Text style={styles.registerText}>New to Insten?</Text>
                <Text style={styles.registerLink}>Create an account</Text>
              </View>
            </TouchableScale>
          </Card>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeText: {
    ...createTextStyle('h1', 'primary', 'bold'),
    color: '#FFF',
    fontSize: 32,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitleText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: 'rgba(255,255,255,0.8)',
  },
  card: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  forgotText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.primary.main,
    textAlign: 'right',
    marginBottom: 24,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  buttonText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: '#FFF',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  registerText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
  registerLink: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.primary.main,
  },
  errorMessage: {
    color: '#FF3B30',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
    ...createTextStyle('body', 'primary', 'medium'),
  },
  rememberMeContainer: {
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberMeText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
}); 
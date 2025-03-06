import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { TouchableScale } from '../components/TouchableScale';
import { buttonStyles } from '../theme/buttons';
import { PersonalInfo, ValidationErrors } from '../types/registration';
import { Card } from '../components/Card';

interface Props {
  onNext: (data: PersonalInfo) => void;
}

export const PersonalInfoScreen = ({ onNext }: Props) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    ownerName: '',
    mobile: '',
    email: '',
    profilePicture: undefined,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Name is required';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Personal Information</Text>
        
        {/* Add input fields similar to BusinessInfoScreen */}
        
        <TouchableScale onPress={handleSubmit}>
          <View style={[buttonStyles.base, buttonStyles.primary]}>
            <Text style={buttonStyles.primaryText}>Complete Registration</Text>
          </View>
        </TouchableScale>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollView: {
    padding: 16,
  },
  title: {
    ...createTextStyle('h1', 'primary', 'bold'),
    color: colors.text.primary,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.text.secondary,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: '#FF3B30',
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.primary,
    flex: 1,
    marginLeft: 8,
  },
}); 
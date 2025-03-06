import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { TouchableScale } from '../components/TouchableScale';
import { buttonStyles } from '../theme/buttons';
import { BusinessInfo, ValidationErrors } from '../types/registration';
import { Card } from '../components/Card';

const SHOP_CATEGORIES = [
  'Retail Store',
  'Restaurant',
  'Grocery Store',
  'Electronics',
  'Fashion & Apparel',
  'Other',
];

interface Props {
  onNext: (data: BusinessInfo) => void;
}

export const BusinessInfoScreen = ({ onNext }: Props) => {
  const [formData, setFormData] = useState<BusinessInfo>({
    shopName: '',
    category: SHOP_CATEGORIES[0],
    gstin: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (formData.gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
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
        <View style={styles.header}>
          <LottieView
            source={{
              uri: 'https://assets3.lottiefiles.com/packages/lf20_bp5lntrf.json'
              // Alternative shop-related animations:
              // 'https://assets10.lottiefiles.com/packages/lf20_4chtrphv.json' // Store with shopping bag
              // 'https://assets5.lottiefiles.com/packages/lf20_uk52xbuq.json' // Shop with cash register
              // 'https://assets5.lottiefiles.com/packages/lf20_syqnfe7c.json' // Modern store building
            }}
            autoPlay
            loop
            style={[styles.headerAnimation, {
              width: 240,
              height: 240,
            }]}
          />
          <Text style={styles.title}>Setup Your Store</Text>
          <Text style={styles.subtitle}>Let's get your digital store ready!</Text>
        </View>

        <Card style={styles.formCard}>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons name="store" size={20} color={colors.primary.main} />
              <Text style={styles.label}>Shop Name</Text>
            </View>
            <TextInput
              style={[styles.input, errors.shopName && styles.inputError]}
              value={formData.shopName}
              onChangeText={(text) => setFormData({ ...formData, shopName: text })}
              placeholder="Enter your shop name"
            />
            {errors.shopName && <Text style={styles.errorText}>{errors.shopName}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons name="tag-multiple" size={20} color={colors.primary.main} />
              <Text style={styles.label}>Category</Text>
            </View>
            <View style={[styles.pickerContainer, errors.category && styles.inputError]}>
              <Picker
                selectedValue={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                style={styles.picker}
              >
                {SHOP_CATEGORIES.map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons name="identifier" size={20} color={colors.primary.main} />
              <Text style={styles.label}>GSTIN (Optional)</Text>
            </View>
            <TextInput
              style={[styles.input, errors.gstin && styles.inputError]}
              value={formData.gstin}
              onChangeText={(text) => setFormData({ ...formData, gstin: text })}
              placeholder="Enter GSTIN if applicable"
            />
            {errors.gstin && <Text style={styles.errorText}>{errors.gstin}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <FontAwesome5 name="map-marked-alt" size={20} color={colors.primary.main} />
              <Text style={styles.label}>Address</Text>
            </View>
            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Enter store address"
              multiline
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
          </View>

          {/* Similar styling for pincode, city, and state fields */}

          <TouchableScale onPress={handleSubmit}>
            <View style={[buttonStyles.base, buttonStyles.primary, styles.submitButton]}>
              <Text style={buttonStyles.primaryText}>Next</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#FFF" />
            </View>
          </TouchableScale>
        </Card>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -20,
  },
  headerAnimation: {
    width: 240,
    height: 240,
    marginBottom: 16,
  },
  title: {
    ...createTextStyle('h1', 'primary', 'bold'),
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
    borderRadius: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.text.primary,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.text.secondary,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  errorText: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: '#FF3B30',
    marginTop: 4,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.text.secondary,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
}); 
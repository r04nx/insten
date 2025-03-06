import React, { useState } from 'react';
import { View, Text, TextInput, Platform, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { TouchableScale } from '../../components/TouchableScale';
import { registrationStyles as styles } from '../../styles/registrationStyles';
import { colors } from '../../theme/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

const SHOP_CATEGORIES = [
  { label: 'Retail Store', value: 'retail' },
  { label: 'Restaurant', value: 'restaurant' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Other', value: 'other' },
];

interface Props {
  onNext: (data: any) => void;
}

export const BusinessInfoScreen = ({ onNext }: Props) => {
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    address: '',
    pincode: '',
    city: '',
  });
  
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.shopName) newErrors.shopName = 'Shop name is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.city) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Tell us about your business</Text>
          
          <Card style={[styles.card, styles.elevatedCard]}>
            {/* Shop Name Input */}
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="store" size={16} color={colors.primary.main} />
                <Text style={styles.label}>Shop Name</Text>
              </View>
              <TextInput
                style={[styles.input, errors.shopName && styles.inputError]}
                placeholder="Enter your shop name"
                value={formData.shopName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, shopName: text }))}
              />
              {errors.shopName && <Text style={styles.errorText}>{errors.shopName}</Text>}
            </View>

            {/* Category Dropdown */}
            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="tag" size={16} color={colors.primary.main} />
                <Text style={styles.label}>Business Category</Text>
              </View>
              <DropDownPicker
                open={open}
                value={formData.category}
                items={SHOP_CATEGORIES}
                setOpen={setOpen}
                setValue={(callback) => {
                  if (typeof callback === 'function') {
                    const newValue = callback(formData.category);
                    setFormData(prev => ({ ...prev, category: newValue }));
                  }
                }}
                style={styles.dropdownStyle}
                dropDownContainerStyle={styles.dropdownContainer}
                placeholderStyle={styles.dropdownPlaceholder}
                textStyle={styles.dropdownText}
                placeholder="Select business type"
                listMode="SCROLLVIEW"
              />
            </View>

            {/* Address Input */}
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary.main} />
                <Text style={styles.label}>Business Address</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter complete address"
                multiline
                numberOfLines={3}
                value={formData.address}
                onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
              />
            </View>

            {/* City and Pincode in one row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons name="city" size={16} color={colors.primary.main} />
                  <Text style={styles.label}>City</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city"
                  value={formData.city}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, city: text }))}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons name="pin" size={16} color={colors.primary.main} />
                  <Text style={styles.label}>Pincode</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter pincode"
                  keyboardType="numeric"
                  maxLength={6}
                  value={formData.pincode}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, pincode: text }))}
                />
              </View>
            </View>

            <TouchableScale 
              onPress={() => validate() && onNext(formData)}
              scale={0.95}
            >
              <LinearGradient
                colors={[colors.primary.main, colors.primary.dark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, styles.elevatedButton]}
              >
                <Text style={styles.buttonText}>Continue</Text>
                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={20} 
                  color="#FFF" 
                />
              </LinearGradient>
            </TouchableScale>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}; 
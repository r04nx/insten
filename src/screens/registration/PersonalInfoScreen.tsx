import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, Image, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { TouchableScale } from '../../components/TouchableScale';
import { registrationStyles as styles } from '../../styles/registrationStyles';
import { colors } from '../../theme/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

interface Props {
  onNext: (data: any) => void;
}

export const PersonalInfoScreen = ({ onNext }: Props) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    mobile: '',
    email: '',
    profilePicture: undefined,
    termsAccepted: false
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (newStatus !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Sorry, we need camera roll permissions to make this work!'
            );
          }
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable photo library access in your device settings to continue.'
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        setFormData(prev => ({ ...prev, profilePicture: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(
        'Error',
        'Failed to pick image. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Name is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { 
            minHeight: height - 120,
            paddingTop: 0,
            justifyContent: 'flex-start'
          }
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentContainer, styles.shiftedContent]}>
          <Text style={styles.title}>Personal Information</Text>
          
          <Card style={[styles.card, styles.elevatedCard]}>
            <View style={styles.avatarContainer}>
              <TouchableScale onPress={pickImage} scale={0.98}>
                <View style={styles.avatarWrapper}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <MaterialCommunityIcons 
                        name="camera-plus" 
                        size={32} 
                        color={colors.primary.main} 
                      />
                      <Text style={styles.avatarText}>Add Photo</Text>
                    </View>
                  )}
                </View>
              </TouchableScale>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="account" size={18} color={colors.primary.main} />
                <Text style={styles.label}>Full Name</Text>
              </View>
              <TextInput
                style={[styles.input, errors.ownerName && styles.inputError]}
                placeholder="John Doe"
                placeholderTextColor={colors.text.placeholder}
                value={formData.ownerName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, ownerName: text }))}
              />
              {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="phone" size={18} color={colors.primary.main} />
                <Text style={styles.label}>Mobile Number</Text>
              </View>
              <TextInput
                style={[styles.input, errors.mobile && styles.inputError]}
                placeholder="9876543210"
                placeholderTextColor={colors.text.placeholder}
                keyboardType="phone-pad"
                maxLength={10}
                value={formData.mobile}
                onChangeText={(text) => setFormData(prev => ({ ...prev, mobile: text }))}
              />
              {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="email" size={18} color={colors.primary.main} />
                <Text style={styles.label}>Email Address</Text>
              </View>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="johndoe@example.com"
                placeholderTextColor={colors.text.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <TouchableScale 
              onPress={() => setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }))}
              scale={0.98}
            >
              <View style={styles.checkboxContainer}>
                <MaterialCommunityIcons
                  name={formData.termsAccepted ? "checkbox-marked" : "checkbox-blank-outline"}
                  size={24}
                  color={formData.termsAccepted ? colors.primary.main : colors.text.secondary}
                />
                <Text style={styles.checkboxText}>
                  I accept the <Text style={styles.linkText}>Terms and Conditions</Text>
                </Text>
              </View>
            </TouchableScale>

            <TouchableScale 
              onPress={() => validate() && onNext(formData)}
              disabled={!formData.termsAccepted}
              scale={0.95}
            >
              <LinearGradient
                colors={!formData.termsAccepted ? 
                  [colors.text.disabled, colors.text.disabled] : 
                  [colors.primary.main, colors.primary.dark]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, styles.elevatedButton]}
              >
                <Text style={[
                  styles.buttonText,
                  !formData.termsAccepted && styles.buttonTextDisabled
                ]}>
                  Continue
                </Text>
                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={20} 
                  color={!formData.termsAccepted ? colors.text.secondary : '#FFF'} 
                />
              </LinearGradient>
            </TouchableScale>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}; 
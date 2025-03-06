import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { TouchableScale } from '../../components/TouchableScale';
import { registrationStyles as styles } from '../../styles/registrationStyles';
import { colors } from '../../theme/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

interface DocumentStatus {
  uri?: string;
  uploaded: boolean;
  loading: boolean;
}

interface Documents {
  gst: DocumentStatus;
  pan: DocumentStatus;
  shopLicense: DocumentStatus;
}

export const ShopVerificationScreen = ({ onNext }: { onNext: () => void }) => {
  const [documents, setDocuments] = useState<Documents>({
    gst: { uploaded: false, loading: false },
    pan: { uploaded: false, loading: false },
    shopLicense: { uploaded: false, loading: false },
  });

  const allUploaded = Object.values(documents).every(doc => doc.uploaded);

  const pickDocument = async (type: keyof Documents) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable photo library access to upload documents.'
        );
        return;
      }

      setDocuments(prev => ({
        ...prev,
        [type]: { ...prev[type], loading: true }
      }));

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        // Simulate upload delay
        setTimeout(() => {
          setDocuments(prev => ({
            ...prev,
            [type]: {
              uri: result.assets[0].uri,
              uploaded: true,
              loading: false
            }
          }));
        }, 1500);
      } else {
        setDocuments(prev => ({
          ...prev,
          [type]: { ...prev[type], loading: false }
        }));
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
      setDocuments(prev => ({
        ...prev,
        [type]: { ...prev[type], loading: false }
      }));
    }
  };

  const renderDocumentCard = (
    type: keyof Documents,
    title: string,
    icon: string,
    description: string
  ) => (
    <TouchableScale 
      onPress={() => pickDocument(type)}
      disabled={documents[type].uploaded}
      scale={0.98}
    >
      <View style={[
        styles.documentCard,
        documents[type].uploaded && styles.documentCardUploaded
      ]}>
        <View style={styles.documentHeader}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={documents[type].uploaded ? colors.success : colors.primary.main}
          />
          <Text style={styles.documentTitle}>{title}</Text>
          {documents[type].uploaded ? (
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color={colors.success}
            />
          ) : documents[type].loading ? (
            <MaterialCommunityIcons
              name="loading"
              size={24}
              color={colors.primary.main}
            />
          ) : (
            <MaterialCommunityIcons
              name="upload"
              size={24}
              color={colors.primary.main}
            />
          )}
        </View>
        
        {documents[type].uri ? (
          <Image 
            source={{ uri: documents[type].uri }} 
            style={styles.documentPreview}
          />
        ) : (
          <Text style={styles.documentDescription}>{description}</Text>
        )}
      </View>
    </TouchableScale>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.compactContent}
      >
        <Card style={[styles.card, styles.elevatedCard]}>
          {renderDocumentCard(
            'gst',
            'GST Certificate',
            'file-document-outline',
            'Upload your GST registration certificate'
          )}

          {renderDocumentCard(
            'pan',
            'PAN Card',
            'card-account-details-outline',
            'Upload your PAN card'
          )}

          {renderDocumentCard(
            'shopLicense',
            'Shop License',
            'store-outline',
            'Upload your shop/establishment license'
          )}

          <TouchableScale 
            onPress={onNext}
            disabled={!allUploaded}
            scale={0.95}
          >
            <LinearGradient
              colors={!allUploaded ? 
                [colors.text.disabled, colors.text.disabled] : 
                [colors.primary.main, colors.primary.dark]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, styles.elevatedButton]}
            >
              <Text style={[
                styles.buttonText,
                !allUploaded && styles.buttonTextDisabled
              ]}>
                Continue
              </Text>
              <MaterialCommunityIcons 
                name="arrow-right" 
                size={20} 
                color={!allUploaded ? colors.text.secondary : '#FFF'} 
              />
            </LinearGradient>
          </TouchableScale>
        </Card>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}; 
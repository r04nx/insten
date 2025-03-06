import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ViewToken,
  Animated,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { TouchableScale } from '../components/TouchableScale';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Welcome to Your\nDigital Shop',
    description: 'Transform your local business into a digital powerhouse',
    icon: 'store',
    color: '#FF4D00',
    features: [
      'Digital storefront',
      'Easy QR code payments',
      'Real-time analytics',
    ],
  },
  {
    id: '2',
    title: 'Smart Inventory\nManagement',
    description: 'Never run out of stock again. Track everything in real-time',
    icon: 'clipboard-list',
    color: '#2962FF',
    features: [
      'Barcode scanning',
      'Low stock alerts',
      'Easy categorization',
    ],
  },
  {
    id: '3',
    title: 'Orders & Delivery\nMade Simple',
    description: 'Accept orders online, manage deliveries with ease',
    icon: 'truck-delivery',
    color: '#00C853',
    features: [
      'Digital receipts',
      'Delivery tracking',
      'Multiple payment options',
    ],
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const OnboardingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item, index }: { item: OnboardingItem; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    return (
      <Animated.View 
        style={[
          styles.slide,
          { width, transform: [{ scale }], opacity }
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <MaterialCommunityIcons name={item.icon} size={40} color="#FFF" />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.featuresContainer}>
          {item.features.map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={24} 
                color={item.color} 
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    );
  };

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
        setCurrentIndex(Number(viewableItems[0].index));
      }
    }
  ).current;

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    transform: [{ scale }],
                    opacity,
                    backgroundColor: onboardingData[currentIndex].color,
                  },
                ]}
              />
            );
          })}
        </View>
        <TouchableScale onPress={onFinish}>
          <LinearGradient
            colors={[onboardingData[currentIndex].color, colors.primary.dark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#FFF" />
          </LinearGradient>
        </TouchableScale>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    ...createTextStyle('h1', 'primary', 'bold'),
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    ...createTextStyle('body', 'primary', 'regular'),
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: 40,
  },
  featuresContainer: {
    width: '100%',
    gap: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.text.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 32,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    width: '100%',
    minWidth: 280,
  },
  buttonText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: '#FFF',
  },
}); 
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { QuickStats } from '../components/dashboard/QuickStats';
import { OrderStatusBreakdown } from '../components/dashboard/OrderStatusBreakdown';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { InventoryAlerts } from '../components/dashboard/InventoryAlerts';
import { BusinessInsights } from '../components/dashboard/BusinessInsights';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { TouchableScale } from '../components/TouchableScale';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native';

const MENU_ITEMS = [
  { icon: 'view-dashboard', label: 'Dashboard', screen: 'Dashboard' },
  { icon: 'shopping', label: 'Orders', screen: 'Orders' },
  { icon: 'store', label: 'Products', screen: 'Products' },
  { icon: 'account', label: 'Profile', screen: 'Profile' },
];

export const DashboardScreen = () => {
  const [activeScreen, setActiveScreen] = useState('Dashboard');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DashboardHeader />
        <QuickStats />
        <OrderStatusBreakdown />
        <RecentActivity />
        <InventoryAlerts />
        <BusinessInsights />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', '#FFF']}
        style={styles.bottomNavContainer}
      >
        <View style={styles.bottomNav}>
          {MENU_ITEMS.map((item) => (
            <TouchableScale
              key={item.screen}
              onPress={() => setActiveScreen(item.screen)}
              scale={0.95}
            >
              <View style={styles.menuItem}>
                <View style={[
                  styles.iconContainer,
                  activeScreen === item.screen && styles.activeIconContainer
                ]}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={activeScreen === item.screen ? colors.primary.main : colors.text.secondary}
                  />
                </View>
                <Text style={[
                  styles.menuLabel,
                  activeScreen === item.screen && styles.activeMenuLabel
                ]}>
                  {item.label}
                </Text>
              </View>
            </TouchableScale>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  menuItem: {
    alignItems: 'center',
    gap: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: `${colors.primary.main}15`,
  },
  menuLabel: {
    ...createTextStyle('caption', 'primary', 'medium'),
    color: colors.text.secondary,
  },
  activeMenuLabel: {
    color: colors.primary.main,
  },
}); 
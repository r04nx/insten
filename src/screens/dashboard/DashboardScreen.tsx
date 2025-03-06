import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { dashboardStyles as styles } from '../../styles/dashboardStyles';
import { DashboardHeader } from './components/DashboardHeader';
import { QuickStats } from './components/QuickStats';
import { OrderStatusBreakdown } from './components/OrderStatusBreakdown';
import { RecentActivity } from './components/RecentActivity';
import { InventoryAlerts } from './components/InventoryAlerts';
import { BusinessInsights } from './components/BusinessInsights';

export const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeader 
        isShopOpen={isShopOpen}
        onToggleShop={() => setIsShopOpen(!isShopOpen)}
        notificationCount={5}
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <QuickStats />
          <OrderStatusBreakdown />
          <RecentActivity />
          <InventoryAlerts />
          <BusinessInsights />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 
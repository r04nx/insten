import React from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { QuickStats } from '../components/dashboard/QuickStats';
import { OrderStatusBreakdown } from '../components/dashboard/OrderStatusBreakdown';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { InventoryAlerts } from '../components/dashboard/InventoryAlerts';
import { BusinessInsights } from '../components/dashboard/BusinessInsights';
import { colors } from '../theme/colors';

export const DashboardScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch new data here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <ScrollView 
      style={styles.container}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
}); 
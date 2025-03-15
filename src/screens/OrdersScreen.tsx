import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import CircularProgress from '../components/CircularProgress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableScale } from '../components/TouchableScale';
import { LinearGradient } from 'expo-linear-gradient';

const orderStatuses = [
  { 
    label: 'New Orders', 
    count: 12, 
    total: 45, 
    icon: 'bell-ring', 
    color: '#FF4D00',
    description: 'Awaiting confirmation',
    trend: '+12%'
  },
  { 
    label: 'Processing', 
    count: 15, 
    total: 45, 
    icon: 'progress-clock', 
    color: '#2962FF',
    description: 'Being prepared',
    trend: '+5%'
  },
  { 
    label: 'Out for Delivery', 
    count: 8, 
    total: 45, 
    icon: 'truck-delivery', 
    color: '#00C853',
    description: 'On the way',
    trend: '-2%'
  },
  { 
    label: 'Delivered', 
    count: 7, 
    total: 45, 
    icon: 'check-circle', 
    color: '#00BFA5',
    description: 'Successfully delivered',
    trend: '+8%'
  },
  { 
    label: 'Cancelled', 
    count: 3, 
    total: 45, 
    icon: 'close-circle', 
    color: '#FF1744',
    description: 'Order cancelled',
    trend: '-1%'
  }
];

const filterOptions = ['Today', 'Week', 'Month', 'Custom'];

export const OrdersScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('Today');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>Manage your orders</Text>
        </View>
        <TouchableScale>
          <View style={styles.searchButton}>
            <MaterialCommunityIcons name="magnify" size={22} color={colors.text.primary} />
          </View>
        </TouchableScale>
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => (
          <TouchableScale key={filter} scale={0.95}>
            <LinearGradient
              colors={selectedFilter === filter 
                ? [colors.primary.main, colors.primary.dark]
                : ['#F8FAFC', '#F1F5F9']}
              style={[styles.filterChip]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive
              ]}>
                {filter}
              </Text>
            </LinearGradient>
          </TouchableScale>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 70 }
        ]}
      >
        {/* Summary Card */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>45</Text>
              <Text style={styles.summaryLabel}>Total Orders</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>₹24,550</Text>
              <Text style={styles.summaryLabel}>Revenue</Text>
            </View>
          </View>
        </Card>

        {/* Status Cards */}
        <View style={styles.statusGrid}>
          {orderStatuses.map((status, index) => (
            <TouchableScale key={index} scale={0.98}>
              <Card style={styles.statusCard}>
                <View style={styles.statusHeader}>
                  <CircularProgress
                    value={(status.count / status.total) * 100}
                    radius={32}
                    strokeWidth={8}
                    color={status.color}
                  >
                    <MaterialCommunityIcons 
                      name={status.icon} 
                      size={20} 
                      color={status.color} 
                    />
                  </CircularProgress>
                  <View style={styles.trendContainer}>
                    <MaterialCommunityIcons 
                      name={status.trend.startsWith('+') ? 'trending-up' : 'trending-down'} 
                      size={16} 
                      color={status.trend.startsWith('+') ? '#10B981' : '#EF4444'}
                    />
                    <Text style={[
                      styles.trendText,
                      { color: status.trend.startsWith('+') ? '#10B981' : '#EF4444' }
                    ]}>
                      {status.trend}
                    </Text>
                  </View>
                </View>
                <View style={styles.statusContent}>
                  <Text style={styles.statusCount}>{status.count}</Text>
                  <Text style={styles.statusLabel}>{status.label}</Text>
                  <Text style={styles.statusDescription}>{status.description}</Text>
                </View>
              </Card>
            </TouchableScale>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  filterContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  filterTextActive: {
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  summaryCard: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 16,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  statusGrid: {
    gap: 12,
  },
  statusCard: {
    padding: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusContent: {
    marginLeft: 8,
  },
  statusCount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
}); 
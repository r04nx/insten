import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../Card';
import { colors } from '../../theme/colors';
import { createTextStyle } from '../../theme/typography';
import CircularProgress from '../CircularProgress';

interface OrderStatus {
  label: string;
  count: number;
  total: number;
  icon: string;
  color: string;
}

const orderStatuses: OrderStatus[] = [
  { label: 'New', count: 5, total: 24, icon: 'bell-ring', color: '#FF4D00' },
  { label: 'Processing', count: 8, total: 24, icon: 'progress-clock', color: '#2962FF' },
  { label: 'Delivering', count: 6, total: 24, icon: 'truck-delivery', color: '#00C853' },
  { label: 'Completed', count: 3, total: 24, icon: 'check-circle', color: '#00BFA5' },
  { label: 'Cancelled', count: 2, total: 24, icon: 'close-circle', color: '#FF1744' },
];

export const OrderStatusBreakdown = () => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Order Status</Text>
      <View style={styles.statusGrid}>
        {orderStatuses.map((status, index) => (
          <View key={index} style={styles.statusItem}>
            <CircularProgress
              value={(status.count / status.total) * 100}
              radius={32}
              strokeWidth={8}
              color={status.color}
            >
              <MaterialCommunityIcons name={status.icon} size={20} color={status.color} />
            </CircularProgress>
            <Text style={styles.statusCount}>{status.count}</Text>
            <Text style={styles.statusLabel}>{status.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
  },
  title: {
    ...createTextStyle('h3', 'primary', 'bold'),
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statusItem: {
    alignItems: 'center',
    width: '18%',
  },
  statusCount: {
    ...createTextStyle('h4', 'primary', 'bold'),
    marginTop: 8,
  },
  statusLabel: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.text.secondary,
    marginTop: 4,
  },
}); 
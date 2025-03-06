import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../Card';
import { colors } from '../../theme/colors';
import { createTextStyle } from '../../theme/typography';
import { TouchableScale } from '../TouchableScale';

interface Activity {
  id: string;
  type: 'order' | 'payment' | 'inventory' | 'delivery';
  message: string;
  time: string;
  icon: string;
  color: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'order',
    message: 'New order #1234 received',
    time: '2 mins ago',
    icon: 'shopping',
    color: '#FF4D00',
    action: {
      label: 'View',
      onPress: () => {},
    },
  },
  {
    id: '2',
    type: 'payment',
    message: 'Payment received for order #1230',
    time: '15 mins ago',
    icon: 'cash-multiple',
    color: '#00C853',
  },
  {
    id: '3',
    type: 'inventory',
    message: 'Low stock alert: Wheat Flour',
    time: '1 hour ago',
    icon: 'alert',
    color: '#FF6D00',
    action: {
      label: 'Restock',
      onPress: () => {},
    },
  },
];

export const RecentActivity = () => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <View style={styles.timeline}>
        {recentActivities.map((activity, index) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={[styles.iconContainer, { backgroundColor: activity.color }]}>
              <MaterialCommunityIcons name={activity.icon} size={20} color="#FFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.message}>{activity.message}</Text>
              <Text style={styles.time}>{activity.time}</Text>
            </View>
            {activity.action && (
              <TouchableScale onPress={activity.action.onPress}>
                <View style={styles.actionButton}>
                  <Text style={styles.actionText}>{activity.action.label}</Text>
                </View>
              </TouchableScale>
            )}
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
  timeline: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  message: {
    ...createTextStyle('body', 'primary', 'medium'),
  },
  time: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.text.secondary,
    marginTop: 2,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.primary.light,
  },
  actionText: {
    ...createTextStyle('caption', 'primary', 'medium'),
    color: colors.primary.main,
  },
}); 
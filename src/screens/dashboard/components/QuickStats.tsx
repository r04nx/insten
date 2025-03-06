import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dashboardStyles as styles } from '../../../styles/dashboardStyles';
import { colors } from '../../../theme/colors';

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  subValue?: string;
  actionIcon?: string;
  onAction?: () => void;
  color: string;
}

const StatCard = ({ icon, title, value, subValue, actionIcon, onAction, color }: StatCardProps) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={styles.statHeader}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      {actionIcon && (
        <TouchableOpacity onPress={onAction} style={styles.statAction}>
          <MaterialCommunityIcons name={actionIcon} size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {subValue && <Text style={styles.statSubValue}>{subValue}</Text>}
  </View>
);

export const QuickStats = () => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <StatCard
          icon="shopping"
          title="Today's Orders"
          value="24"
          subValue="+3 from yesterday"
          actionIcon="arrow-right"
          onAction={() => {}}
          color={colors.primary.main}
        />
        <StatCard
          icon="currency-inr"
          title="Revenue"
          value="₹12,450"
          subValue="+8% vs yesterday"
          actionIcon="trending-up"
          onAction={() => {}}
          color={colors.success}
        />
      </View>
      <View style={styles.statsRow}>
        <StatCard
          icon="clock-outline"
          title="Active Orders"
          value="8"
          actionIcon="refresh"
          onAction={() => {}}
          color={colors.warning}
        />
        <StatCard
          icon="cash-multiple"
          title="Pending Payments"
          value="₹4,320"
          actionIcon="arrow-right"
          onAction={() => {}}
          color={colors.error}
        />
      </View>
    </View>
  );
}; 
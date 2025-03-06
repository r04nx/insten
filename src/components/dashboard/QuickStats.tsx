import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../Card';
import { colors } from '../../theme/colors';
import { createTextStyle } from '../../theme/typography';
import { TouchableScale } from '../TouchableScale';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  onPress: () => void;
}

const StatCard = ({ title, value, icon, color, onPress }: StatCardProps) => (
  <TouchableScale onPress={onPress}>
    <Card style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </Card>
  </TouchableScale>
);

export const QuickStats = () => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <StatCard
        title="Today's Orders"
        value="24"
        icon="shopping"
        color="#FF4D00"
        onPress={() => {}}
      />
      <StatCard
        title="Revenue"
        value="₹12,450"
        icon="currency-inr"
        color="#00C853"
        onPress={() => {}}
      />
      <StatCard
        title="Active Orders"
        value="8"
        icon="clock-fast"
        color="#2962FF"
        onPress={() => {}}
      />
      <StatCard
        title="Pending"
        value="₹2,840"
        icon="cash-clock"
        color="#FF6D00"
        onPress={() => {}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    padding: 16,
    width: 160,
    borderLeftWidth: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statTitle: {
    ...createTextStyle('caption', 'primary', 'medium'),
    color: colors.text.secondary,
  },
  statValue: {
    ...createTextStyle('h3', 'primary', 'bold'),
    color: colors.text.primary,
  },
}); 
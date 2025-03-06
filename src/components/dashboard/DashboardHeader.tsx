import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { createTextStyle } from '../../theme/typography';
import { Card } from '../Card';

export const DashboardHeader = () => {
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity 
          style={[styles.statusButton, !isShopOpen && styles.statusButtonClosed]}
          onPress={() => setIsShopOpen(!isShopOpen)}
        >
          <MaterialCommunityIcons 
            name={isShopOpen ? 'store' : 'store-off'} 
            size={20} 
            color="#FFF" 
          />
          <Text style={styles.statusText}>
            {isShopOpen ? 'Open' : 'Closed'}
          </Text>
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="bell" size={24} color={colors.text.primary} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account-circle" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.date}>{formattedDate}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusButtonClosed: {
    backgroundColor: colors.error,
  },
  statusText: {
    color: '#FFF',
    ...createTextStyle('body', 'primary', 'medium'),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 4,
  },
  date: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
}); 
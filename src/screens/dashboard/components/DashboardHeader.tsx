import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dashboardStyles as styles } from '../../../styles/dashboardStyles';
import { colors } from '../../../theme/colors';
import { format } from 'date-fns';

interface Props {
  isShopOpen: boolean;
  onToggleShop: () => void;
  notificationCount: number;
}

export const DashboardHeader = ({ isShopOpen, onToggleShop, notificationCount }: Props) => {
  const today = new Date();
  
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity 
          onPress={onToggleShop}
          style={[
            styles.shopStatusButton,
            isShopOpen ? styles.shopStatusOpen : styles.shopStatusClosed
          ]}
        >
          <MaterialCommunityIcons
            name={isShopOpen ? "store" : "store-off"}
            size={20}
            color={isShopOpen ? colors.success : colors.error}
          />
          <Text style={[
            styles.shopStatusText,
            isShopOpen ? styles.shopStatusTextOpen : styles.shopStatusTextClosed
          ]}>
            {isShopOpen ? 'Open' : 'Closed'}
          </Text>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color={colors.text.primary}
            />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons
              name="account-circle"
              size={32}
              color={colors.primary.main}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerBottom}>
        <Text style={styles.dateText}>
          {format(today, 'EEEE, dd MMMM yyyy')}
        </Text>
      </View>
    </View>
  );
}; 
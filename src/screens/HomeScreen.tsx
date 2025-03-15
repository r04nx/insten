import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, RefreshControl, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';
import { Card } from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableScale } from '../components/TouchableScale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const quickStats = [
    { 
      title: "Today's Sales", 
      amount: '₹24,550', 
      icon: 'cash-register',
      color: '#7C3AED',
      change: '+12.5%'
    },
    { 
      title: 'Orders', 
      count: '48',
      icon: 'shopping',
      color: '#2563EB',
      change: '+8.2%'
    },
    { 
      title: 'Customers',
      count: '156',
      icon: 'account-group',
      color: '#059669',
      change: '+5.3%'
    }
  ];

  const orderStatus = [
    { label: 'Pending', count: 12, color: '#F59E0B' },
    { label: 'Processing', count: 8, color: '#3B82F6' },
    { label: 'Completed', count: 32, color: '#10B981' },
  ];

  const paymentStats = [
    { 
      method: 'Cash', 
      amount: '₹12,450', 
      count: 18, 
      icon: 'cash', 
      color: '#10B981' 
    },
    { 
      method: 'Online', 
      amount: '₹8,350', 
      count: 22, 
      icon: 'credit-card', 
      color: '#3B82F6' 
    },
    { 
      method: 'UPI', 
      amount: '₹3,750', 
      count: 8, 
      icon: 'cellphone', 
      color: '#8B5CF6' 
    }
  ];

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <View style={styles.appBarContent}>
          <View style={styles.brandContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={[styles.logo, { resizeMode: 'contain' }]}
            />
            <Text style={styles.appName}>StoreName</Text>
          </View>
          <View style={styles.appBarActions}>
            <TouchableScale scale={0.95}>
              <View style={styles.iconButton}>
                <MaterialCommunityIcons name="bell-outline" size={22} color={colors.text.primary} />
              </View>
            </TouchableScale>
            <TouchableScale scale={0.95}>
              <View style={styles.iconButton}>
                <MaterialCommunityIcons name="account-circle-outline" size={22} color={colors.text.primary} />
              </View>
            </TouchableScale>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 70 }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
      >
        {/* Header with Store Status */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, John 👋</Text>
            <Text style={styles.subGreeting}>Welcome back to your store</Text>
          </View>
          <TouchableScale onPress={() => setIsShopOpen(!isShopOpen)} scale={0.95}>
            <LinearGradient
              colors={isShopOpen ? ['#34D399', '#059669'] : ['#F87171', '#DC2626']}
              style={styles.storeStatus}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons 
                name={isShopOpen ? 'store' : 'store-off'} 
                size={16} 
                color="#FFF" 
              />
            </LinearGradient>
          </TouchableScale>
        </View>

        {/* Quick Stats */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.statsScroll}
          contentContainerStyle={styles.statsScrollContent}
        >
          {quickStats.map((stat, index) => (
            <TouchableScale key={index} scale={0.98}>
              <Card style={styles.statCard}>
                <View style={[styles.iconCircle, { backgroundColor: `${stat.color}15` }]}>
                  <MaterialCommunityIcons name={stat.icon} size={20} color={stat.color} />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                  <Text style={styles.statValue}>{stat.count || stat.amount}</Text>
                  <Text style={[styles.statChange, { color: stat.color }]}>{stat.change}</Text>
                </View>
              </Card>
            </TouchableScale>
          ))}
        </ScrollView>

        {/* Order Status */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Orders</Text>
            <TouchableScale scale={0.95}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableScale>
          </View>
          <View style={styles.orderStatusContainer}>
            {orderStatus.map((status, index) => (
              <View key={index} style={styles.statusItem}>
                <View style={styles.statusHeader}>
                  <Text style={styles.statusLabel}>{status.label}</Text>
                  <Text style={[styles.statusCount, { color: status.color }]}>{status.count}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: status.color,
                        width: `${(status.count / 52) * 100}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Payment Stats */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Payment Summary</Text>
            <TouchableScale scale={0.95}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableScale>
          </View>
          <View style={styles.paymentStatsContainer}>
            {paymentStats.map((payment, index) => (
              <TouchableScale key={index} scale={0.98}>
                <View style={styles.paymentItem}>
                  <View style={[styles.paymentIconContainer, { backgroundColor: `${payment.color}15` }]}>
                    <MaterialCommunityIcons name={payment.icon} size={20} color={payment.color} />
                  </View>
                  <View style={styles.paymentDetails}>
                    <Text style={styles.paymentMethod}>{payment.method}</Text>
                    <Text style={styles.paymentCount}>{payment.count} payments</Text>
                  </View>
                  <Text style={styles.paymentAmount}>{payment.amount}</Text>
                </View>
              </TouchableScale>
            ))}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 80,
  },
  appBar: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    zIndex: 10,
  },
  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 56,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  subGreeting: {
    fontSize: 13,
    color: '#64748B',
  },
  storeStatus: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsScroll: {
    marginVertical: 8,
  },
  statsScrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    width: 180,
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionCard: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  viewAll: {
    fontSize: 13,
    color: colors.primary.main,
    fontWeight: '500',
  },
  orderStatusContainer: {
    gap: 12,
  },
  statusItem: {
    gap: 6,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  statusCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#F1F5F9',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  paymentStatsContainer: {
    gap: 10,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  paymentIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  paymentCount: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
}); 
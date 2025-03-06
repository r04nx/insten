import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    backgroundColor: colors.background.paper,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBottom: {
    marginTop: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopStatusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  shopStatusOpen: {
    backgroundColor: `${colors.success}10`,
    borderColor: colors.success,
  },
  shopStatusClosed: {
    backgroundColor: `${colors.error}10`,
    borderColor: colors.error,
  },
  shopStatusText: {
    ...createTextStyle('body', 'primary', 'medium'),
    marginLeft: 6,
  },
  shopStatusTextOpen: {
    color: colors.success,
  },
  shopStatusTextClosed: {
    color: colors.error,
  },
  notificationButton: {
    padding: 8,
    marginRight: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background.paper,
  },
  notificationCount: {
    ...createTextStyle('caption', 'primary', 'bold'),
    color: '#FFF',
    fontSize: 10,
  },
  profileButton: {
    padding: 4,
  },
  dateText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statAction: {
    padding: 4,
  },
  statTitle: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.text.secondary,
    marginBottom: 4,
  },
  statValue: {
    ...createTextStyle('h4', 'primary', 'semibold'),
    color: colors.text.primary,
  },
  statSubValue: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.text.secondary,
    marginTop: 4,
  },
}); 
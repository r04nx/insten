import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { createTextStyle } from '../theme/typography';

export const registrationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  shiftedContent: {
    marginTop: Platform.OS === 'ios' ? -20 : -16,
  },
  title: {
    ...createTextStyle('h4', 'primary', 'bold'),
    marginBottom: 12,
    marginTop: 0,
    color: colors.text.primary,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.text.secondary,
    marginLeft: 8,
  },
  input: {
    height: 50,
    backgroundColor: colors.background.paper,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...createTextStyle('body', 'primary', 'regular'),
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: `${colors.error}10`,
  },
  errorText: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.error,
    marginTop: 4,
  },
  button: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    ...createTextStyle('body', 'primary', 'semibold'),
    fontSize: 16,
    marginRight: 12,
    letterSpacing: 0.5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary.main,
    borderStyle: 'dashed',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.main,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    ...createTextStyle('caption', 'primary', 'medium'),
    color: colors.primary.main,
    marginTop: 4,
    fontSize: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 8,
  },
  checkboxText: {
    ...createTextStyle('body', 'primary', 'regular'),
    marginLeft: 12,
    color: colors.text.primary,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  flex1: {
    flex: 1,
  },
  dropdownStyle: {
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.primary,
  },
  dropdownPlaceholder: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  elevatedCard: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  elevatedButton: {
    ...Platform.select({
      ios: {
        shadowColor: colors.primary.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonTextDisabled: {
    color: 'rgba(255,255,255,0.7)',
  },
  linkText: {
    color: colors.primary.main,
    textDecorationLine: 'underline',
  },
  dayContainer: {
    marginBottom: 16,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.text.primary,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary.main}10`,
    padding: 8,
    borderRadius: 8,
    minWidth: 100,
    justifyContent: 'center',
  },
  timeText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.primary.main,
    marginLeft: 6,
  },
  toText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerCancelText: {
    ...createTextStyle('body', 'primary', 'regular'),
    color: colors.text.secondary,
  },
  pickerDoneText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.primary.main,
  },
  iosPicker: {
    height: 200,
  },
  compactContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  compactCard: {
    padding: 16,
    marginTop: 0,
  },
  compactDayContainer: {
    marginBottom: 12,
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary.main}10`,
    padding: 6,
    borderRadius: 6,
    minWidth: 90,
    justifyContent: 'center',
  },
  documentCard: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  documentCardUploaded: {
    borderStyle: 'solid',
    borderColor: colors.success,
    backgroundColor: `${colors.success}05`,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  documentTitle: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.text.primary,
    flex: 1,
    marginLeft: 12,
  },
  documentDescription: {
    ...createTextStyle('caption', 'primary', 'regular'),
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  documentPreview: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
}); 
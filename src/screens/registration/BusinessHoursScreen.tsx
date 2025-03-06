import React, { useState } from 'react';
import { View, Text, SafeAreaView, Switch, Platform, Modal, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { TouchableScale } from '../../components/TouchableScale';
import { registrationStyles as styles } from '../../styles/registrationStyles';
import { colors } from '../../theme/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const DAYS = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

interface TimeRange {
  open: Date;
  close: Date;
}

interface DaySchedule {
  isOpen: boolean;
  hours: TimeRange;
}

interface BusinessHours {
  [key: string]: DaySchedule;
}

export const BusinessHoursScreen = ({ onNext }: { onNext: (data: any) => void }) => {
  const [hours, setHours] = useState<BusinessHours>(() => {
    const defaultHours: BusinessHours = {};
    DAYS.forEach(day => {
      defaultHours[day.id] = {
        isOpen: true,
        hours: {
          open: new Date().setHours(9, 0),
          close: new Date().setHours(18, 0),
        },
      };
    });
    return defaultHours;
  });

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedType, setSelectedType] = useState<'open' | 'close'>('open');
  const [tempTime, setTempTime] = useState(new Date());

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedTime && selectedDay) {
      setTempTime(selectedTime);
      if (Platform.OS === 'android') {
        setHours(prev => ({
          ...prev,
          [selectedDay]: {
            ...prev[selectedDay],
            hours: {
              ...prev[selectedDay].hours,
              [selectedType]: selectedTime,
            },
          },
        }));
      }
    }
  };

  const handleIosTimeConfirm = () => {
    setHours(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        hours: {
          ...prev[selectedDay].hours,
          [selectedType]: tempTime,
        },
      },
    }));
    setShowPicker(false);
  };

  const formatTime = (date: Date | number) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const showTimePicker = (day: string, type: 'open' | 'close') => {
    setSelectedDay(day);
    setSelectedType(type);
    setTempTime(new Date(hours[day].hours[type]));
    setShowPicker(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.compactContent}
      >
        <Card style={[styles.card, styles.elevatedCard, styles.compactCard]}>
          {DAYS.map(day => (
            <View key={day.id} style={styles.compactDayContainer}>
              <View style={[
                styles.dayHeader,
                !hours[day.id].isOpen && { marginBottom: 0 }
              ]}>
                <Text style={styles.dayText}>{day.label}</Text>
                <Switch
                  value={hours[day.id].isOpen}
                  onValueChange={(value) => 
                    setHours(prev => ({
                      ...prev,
                      [day.id]: { ...prev[day.id], isOpen: value },
                    }))
                  }
                  trackColor={{ false: '#E0E0E0', true: `${colors.primary.main}50` }}
                  thumbColor={hours[day.id].isOpen ? colors.primary.main : '#999'}
                />
              </View>

              {hours[day.id].isOpen && (
                <View style={styles.timeContainer}>
                  <TouchableScale 
                    onPress={() => showTimePicker(day.id, 'open')}
                    style={styles.timeButton}
                  >
                    <MaterialCommunityIcons 
                      name="clock-outline" 
                      size={16} 
                      color={colors.primary.main} 
                    />
                    <Text style={styles.timeText}>
                      {formatTime(hours[day.id].hours.open)}
                    </Text>
                  </TouchableScale>

                  <Text style={styles.toText}>to</Text>

                  <TouchableScale 
                    onPress={() => showTimePicker(day.id, 'close')}
                    style={styles.timeButton}
                  >
                    <MaterialCommunityIcons 
                      name="clock-outline" 
                      size={16} 
                      color={colors.primary.main} 
                    />
                    <Text style={styles.timeText}>
                      {formatTime(hours[day.id].hours.close)}
                    </Text>
                  </TouchableScale>
                </View>
              )}
            </View>
          ))}

          <TouchableScale onPress={() => onNext(hours)} scale={0.95}>
            <LinearGradient
              colors={[colors.primary.main, colors.primary.dark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, styles.elevatedButton]}
            >
              <Text style={styles.buttonText}>Continue</Text>
              <MaterialCommunityIcons 
                name="arrow-right" 
                size={20} 
                color="#FFF" 
              />
            </LinearGradient>
          </TouchableScale>
        </Card>
      </KeyboardAwareScrollView>

      {Platform.OS === 'ios' ? (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text style={styles.pickerCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIosTimeConfirm}>
                  <Text style={styles.pickerDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempTime}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
                style={styles.iosPicker}
              />
            </View>
          </View>
        </Modal>
      ) : showPicker ? (
        <DateTimePicker
          value={tempTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      ) : null}
    </SafeAreaView>
  );
}; 
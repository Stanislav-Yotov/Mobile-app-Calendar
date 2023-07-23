import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderCalendar = () => {
    const weeks = [];

    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    let dayCount = 1;
    let prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const prevMonthYear =
      firstDayOfMonth === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear();
    const prevMonthMonth =
      firstDayOfMonth === 0 ? 11 : currentMonth.getMonth() - 1;
    const daysInPrevMonth = new Date(
      prevMonthYear,
      prevMonthMonth + 1,
      0
    ).getDate();

    const today = new Date(); // Get the current date
    const currentDay = today.getDate();
    const currentMonthNum = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 6; i++) {
      const days = [];
      let shouldRenderWeek = false; // Flag to check if the week should be rendered
      for (let j = 1; j <= 7; j++) {
        const isWeekend = j === 6 || j === 7;
        if (prevMonthDays > 0) {
          // Display previous month's days
          days.push(
            <TouchableOpacity
              key={`prev-${prevMonthDays}`}
              style={[
                styles.day,
                { opacity: 0.5 },
              ]}
              onPress={() => setSelectedDate(null)}
            >
              <Text style={isWeekend ? styles.weekendText : null}>
                {daysInPrevMonth - prevMonthDays + 1}
              </Text>
            </TouchableOpacity>
            
          );
          prevMonthDays--;
        } else if (dayCount <= daysInMonth) {
          // Display current month's days
          days.push(
            <TouchableOpacity
              key={`current-${dayCount}`}
              style={[
                styles.day,
                dayCount === selectedDate ? styles.selectedDay : null,
                dayCount === currentDay && currentMonthNum === currentMonth.getMonth() && currentYear === currentMonth.getFullYear()
                  ? styles.currentDay
                  : null,
              ]}
              onPress={() => setSelectedDate(dayCount)}
            >
              <Text style={isWeekend ? styles.weekendText : null}>
                {dayCount}
              </Text>
            </TouchableOpacity>
          );
          dayCount++;
          shouldRenderWeek = true; // Set the flag to true when an active day is found in the current month
        } else {
          // Display next month's days
          days.push(
            <TouchableOpacity
              key={`next-${dayCount - daysInMonth}`}
              style={[
                styles.day,
                { opacity: 0.5 },
              ]}
              onPress={() => setSelectedDate(null)}
            >
              <Text style={isWeekend ? styles.weekendText : null}>
                {dayCount - daysInMonth}
              </Text>
            </TouchableOpacity>
          );
          dayCount++;
        }
      }
      // Check if the week should be rendered and push it into the weeks array
      if (shouldRenderWeek) {
        weeks.push(
          <View key={i} style={styles.week}>
            {days}
          </View>
        );
      }
    }
    return weeks;
  };

  return (
    <View style={styles.calendar}>
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekdays}>
        <Text style={styles.dayText}>Mon</Text>
        <Text style={styles.dayText}>Tue</Text>
        <Text style={styles.dayText}>Wed</Text>
        <Text style={styles.dayText}>Thu</Text>
        <Text style={styles.dayText}>Fri</Text>
        <Text style={styles.dayText}>Sat</Text>
        <Text style={styles.dayText}>Sun</Text>
      </View>
      {renderCalendar()}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    padding: 16,
    minWidth: '100%',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 5
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8
  },
  weekendText: {
    color: 'red'
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    width: 40, // Increase the day width for a larger look
    height: 40, // Increase the day height for a larger look
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Add some border radius for a 3D effect
    backgroundColor: 'white', // Add a white background color
    elevation: 3, // Add some shadow for a 3D effect
  },
  selectedDay: {
    backgroundColor: '#ddd',
  },
  emptyDay: {
    flex: 1,
    borderWidth: 1,
  },
  currentDay: {
    backgroundColor: '#99d5d5',
  },
  scrollView: {
    flexGrow: 1,
    minWidth: '100%'
  },
});

export default Calendar;

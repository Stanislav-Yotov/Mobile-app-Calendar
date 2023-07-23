import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Calendar from './Components/Calendar';

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <View style={styles.container}>
          <Calendar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

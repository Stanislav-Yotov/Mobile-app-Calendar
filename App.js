import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Calendar from './Components/Calendar';

export default function App() {
  return (
    <View>
    <Calendar />  
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//});

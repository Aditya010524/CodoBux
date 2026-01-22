import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#0F172A']}
      style={styles.container}>
      <Text style={styles.logo}>CJM</Text>
      {/* <ActivityIndicator size="large" color="#60A5FA" />
      <Text style={styles.text}>Loading...</Text> */}
    </LinearGradient>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
//   text: {
//     marginTop: 10,
//     color: '#94A3B8',
//   },
});

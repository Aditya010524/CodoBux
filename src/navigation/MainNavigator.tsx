import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/HomeScreen';
import CreateJobScreen from '../screens/main/CreateJobScreen';
import ProfileScreen from '../screens/profile/Profile';
import JobDetailsScreen from '../screens/main/JobDetails';
import EditJobScreen from '../screens/main/EditJobScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateJobScreen" component={CreateJobScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
      <Stack.Screen name="EditJobScreen" component={EditJobScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const homeScreens = [{ name: 'Home', component: HomeScreen }];

  return (
    <Stack.Navigator>
      {homeScreens.map((data, index) => (
        <Stack.Screen
          key={index}
          name={data.name}
          component={data.component}
          options={() => ({
            headerShown: (data as any)?.headerShown ?? false,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;

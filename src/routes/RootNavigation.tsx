import { createNavigationContainerRef } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export const onPress = async (name: keyof ParamListBase, params?: Record<string, any>) => {
  try {
    if (navigationRef.isReady() && name) {
      navigationRef.navigate(name, params);
    }
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

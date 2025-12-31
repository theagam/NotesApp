import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {apiRequest} from '../helper/apis';
// import {endpoints} from '../helper/endpoints';
import { useToast } from 'react-native-toast-notifications';
import { Alert } from 'react-native';

export const navigationStateType = {
  HOME: 'HOME',
  AUTH: 'AUTH',
  LOADING: 'LOADING',
};
export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [navigationState, setNavigationState] = useState(
    navigationStateType.LOADING,
  );

  useEffect(() => {
    const loadStoredAuth = async () => {
      // Keep Splash Screen for 3 seconds

      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');

      if (token && userData) {
        setUser(JSON.parse(userData));
        setNavigationState(navigationStateType.HOME);
      } else {
        setNavigationState(navigationStateType.AUTH);
      }
    };

    loadStoredAuth();
  }, []);

  // const login = async (data: {username: string; password: string}) => {
  //   const res: any = await apiRequest('post', endpoints.login, data);

  //   await AsyncStorage.setItem('token', res.token);
  //   await AsyncStorage.setItem('user', JSON.stringify(res.user));
  //   await AsyncStorage.setItem('employee', JSON.stringify(res.employee));

  //   setUser(res.user);
  //   setEmployee(res.employee);
  //   setNavigationState(navigationStateType.HOME);
  // };

  // const logout = async () => {
  //   try {
  //     await apiRequest('post', endpoints.logout);
  //   } catch (err) {
  //     console.log('Logout API failed (safe to ignore)');
  //   } finally {
  //     await AsyncStorage.multiRemove(['token', 'user', 'employee']);
  //     setUser(null);
  //     setEmployee(null);
  //     setNavigationState(navigationStateType.AUTH);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        // login,
        // logout,
        navigationState,
        setNavigationState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

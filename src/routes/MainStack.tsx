import { StatusBar } from 'react-native';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './HomeStack';
import { navigationStateType } from '../context/AuthContext';
import { navigationRef } from './RootNavigation';
import useUser from '../hooks/useUser';
import Loader from '../components/Loader/Loader';

const MainStack = () => {
  const { navigationState } = useUser();

  const renderStack = () => {
    switch (navigationState) {
      case navigationStateType.AUTH:
        return <AuthStack />;

      case navigationStateType.HOME:
        return <HomeStack />;

      default:
        <Loader />;
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" translucent={true} />
      {renderStack()}
    </NavigationContainer>
  );
};

export default MainStack;

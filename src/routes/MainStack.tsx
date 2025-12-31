import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { navigationRef } from './RootNavigation';

import useUser from '../hooks/useUser';
import Loader from '../components/Loader/Loader';

const MainStack = () => {
  const { user, loading } = useUser();

  const renderStack = () => {
    switch (true) {
      case loading:
        return <Loader />;

      case !!user:
        return <HomeStack />;

      default:
        return <AuthStack />;
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" translucent />
      {renderStack()}
    </NavigationContainer>
  );
};

export default MainStack;

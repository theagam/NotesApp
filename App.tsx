import { ToastProvider } from 'react-native-toast-notifications';
import { AuthProvider } from './src/context/AuthProvider';
import MainStack from './src/routes/MainStack';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const App: React.FC = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(80);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardOffset(e.endCoordinates.height + 20);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(80);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  return (
    <ToastProvider
      placement="bottom"
      duration={3000}
      offsetBottom={keyboardOffset}
    >
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;

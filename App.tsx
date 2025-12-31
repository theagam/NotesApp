import { AuthProvider } from './src/context/AuthContext';
import MainStack from './src/routes/MainStack';

function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

export default App;

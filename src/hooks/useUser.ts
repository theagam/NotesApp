import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};

export default useUser;

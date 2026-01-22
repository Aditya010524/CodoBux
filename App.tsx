import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
              <RootNavigator />
    </AuthProvider>
  );
};

export default App;

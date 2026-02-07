import { StatusBar } from 'expo-status-bar';
import './global.css';
import RootNavigator from './src/core/navigation/RootNavigator';
import { AuthProvider } from './src/core/app-context';

export default function App() {
  return (
    <AuthProvider> 
      <RootNavigator />
    </AuthProvider>
  );
}
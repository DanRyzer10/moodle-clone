import { StatusBar } from 'expo-status-bar';
import './global.css';
import { LoginScreen } from './src/screens/auth/login-screen';
import RootNavigator from './src/core/navigation/RootNavigator';

export default function App() {
  return <RootNavigator />;
}
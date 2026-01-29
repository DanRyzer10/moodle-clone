import { StatusBar } from 'expo-status-bar';
import './global.css';
import { LoginScreen } from './src/screens/auth/login-screen';

export default function App() {
  return (
    <>
      <LoginScreen />
      <StatusBar style="dark" />
    </>
  );
}
import { StatusBar } from 'expo-status-bar';
import './global.css';
import RootNavigator from './src/core/navigation/RootNavigator';

export default function App() {
  return <RootNavigator />;
}
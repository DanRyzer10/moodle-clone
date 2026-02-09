import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const DARK_MODE_KEY = 'dark_mode_preference';

export const useDarkMode = () => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadDarkModePreference();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem(DARK_MODE_KEY);
      if (savedPreference !== null) {
        setIsDarkMode(savedPreference === 'true');
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const toggleDarkMode = async (value: boolean) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem(DARK_MODE_KEY, value.toString());
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileHeader } from '../../components/profile/profile-header'; 
import { SectionTitle } from '../../components/profile/section-title'; 
import { FormGroup } from '../../components/profile/form-group'; 
import { FormInput } from '../../components/profile/form-input'; 
import { SettingItem } from '../../components/profile/setting-item'; 
import { BottomTabBar } from '../../components/navigation/bottom-tabbar'; 
import { AuthService } from '../../services/auth/auth.service'; 
import { save,getValueFor, deleteValueFor } from '../../core/utils/secure-store';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { UserProfile } from '../../core/types'; 
import { MaterialIcons } from '@expo/vector-icons';
import { AUTH_STORAGE_KEY } from '../../core/constants';
import { useAuth } from '../../core/context/auth-context';

type TabName = 'Courses' | 'Assignments' | 'Forums' | 'Profile';

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Profile');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {setIsSignedIn} = useAuth()

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData: any = await getValueFor(AUTH_STORAGE_KEY);
      console.log('Loaded user data:', userData.email);
      if (userData) {
        const userProfile: UserProfile = {
          name: userData.firstname,
          email: userData.email,
          picture: userData.picture,
          id: userData.id
        };
        setUser(userProfile);
        setName(`${userData.firstname} ${userData.lastname}`);
        setEmail(userData.email);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      console.log('Saving profile with name:', name, 'and email:', email);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleEditPhoto = () => {
    Alert.alert('Edit Photo', 'Photo picker feature coming soon');
  };

  const handleNotifications = () => {
    console.log('Navigate to Notifications');
  };

  const handleSecurity = () => {
    console.log('Navigate to Security');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteValueFor(AUTH_STORAGE_KEY);
            } catch (error) {
              console.error('Error logging out:', error);
            }
            setIsSignedIn(false);
          },
        },
      ]
    );
  };

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    console.log('Tab pressed:', tab);
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center">
        <Text className="text-slate-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top App Bar */}
      <View className="bg-background-light/80 dark:bg-background-dark/80 border-b border-slate-200 dark:border-slate-800">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="w-16" />
          <Text className="text-lg font-bold text-slate-900 dark:text-white flex-1 text-center">
            Profile
          </Text>
          <TouchableOpacity onPress={handleSave} className="w-16 items-end">
            <Text className="text-primary text-base font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-6 p-4 max-w-lg mx-auto w-full pb-24">

          <ProfileHeader user={user} onEditPhoto={handleEditPhoto} />

          <View className="flex-col gap-2">
            <SectionTitle title="Personal Information" />
            <FormGroup>
              <FormInput
                label="Name"
                value={name}
                onChangeText={setName}
              />
              <FormInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </FormGroup>
            <Text className="ml-1 text-xs text-slate-400 dark:text-slate-500">
              Your email is visible to your instructors and classmates.
            </Text>
          </View>
          <View className="flex-col gap-2">
            <SectionTitle title="Preferences" />
            <FormGroup>
              <SettingItem
                icon="dark-mode"
                iconBgColor="bg-indigo-50 dark:bg-slate-700"
                iconColor="#6366f1"
                title="Dark Mode"
                hasToggle
                toggleValue={isDarkMode}
                onToggle={toggleDarkMode}
              />
              <SettingItem
                icon="notifications"
                iconBgColor="bg-orange-50 dark:bg-slate-700"
                iconColor="#f97316"
                title="Notifications"
                hasArrow
                onPress={handleNotifications}
              />
              <SettingItem
                icon="lock"
                iconBgColor="bg-green-50 dark:bg-slate-700"
                iconColor="#16a34a"
                title="Password & Security"
                hasArrow
                onPress={handleSecurity}
              />
            </FormGroup>
          </View>


          <View className="pt-4">
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.8}
              className="flex-row w-full items-center justify-center gap-2 rounded-xl border border-red-100 dark:border-red-900/30 bg-white dark:bg-[#1e293b] px-4 py-3.5 shadow-sm active:bg-red-50 dark:active:bg-red-900/20"
            >
              <MaterialIcons name="logout" size={20} color="#dc2626" />
              <Text className="text-base font-bold text-red-600">Log Out</Text>
            </TouchableOpacity>
            <Text className="mt-4 text-center text-xs text-slate-400">
              Version 2.4.0 (Build 302)
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};
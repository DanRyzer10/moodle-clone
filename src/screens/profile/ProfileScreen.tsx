import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '../../core/app-context';
import { UserService } from '../../services/profile/user.service';
import { UserProfile } from '../../core/types';
import { AUTH_STORAGE_KEY } from '../../core/constants';
import * as SecureStore from 'expo-secure-store';

const userService = new UserService();

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useAuth(); 
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.token) return;
      try {
        const data = await userService.getUserInfo(user.token);
        setProfile(data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        Alert.alert("Error", "No se pudo obtener la información del servidor");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } else {
        await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
      }

      setUser(null);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }], 
        })
      );
    } catch (e) {
      Alert.alert("Error", "No se pudo cerrar la sesión");
    }
  };

  if (loading) return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-background-dark">
      <ActivityIndicator size="large" color="#135bec" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      <View className="px-6 py-4 flex-row items-center border-b border-slate-100 dark:border-slate-800">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <MaterialIcons name="arrow-back-ios" size={20} color="#135bec" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold dark:text-white">Mi Perfil</Text>
        <View className="w-10" />
      </View>

      <View className="items-center pt-10 px-6">
        <Image 
          source={{ uri: `https://ui-avatars.com/api/?name=${profile?.name || 'User'}&background=135bec&color=fff` }} 
          className="size-32 rounded-full border-4 border-primary/10"
        />

        <Text className="mt-6 text-2xl font-black text-slate-900 dark:text-white">
          {profile?.name}
        </Text>
        <Text className="text-slate-500 font-medium italic">ID: {profile?.id}</Text>

        <View className="w-full mt-10 space-y-4">
          <View className="bg-slate-50 dark:bg-slate-800 p-5 rounded-3xl flex-row items-center border border-slate-100 dark:border-slate-700">
            <MaterialIcons name="email" size={24} color="#135bec" />
            <View className="ml-4">
              <Text className="text-slate-400 text-[10px] font-bold uppercase">Correo Electrónico</Text>
              <Text className="text-slate-900 dark:text-white font-bold">{profile?.email}</Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-50 dark:bg-red-900/20 p-5 rounded-3xl flex-row items-center mt-6 border border-red-100 dark:border-red-900/30"
          >
            <MaterialIcons name="logout" size={24} color="#ef4444" />
            <Text className="ml-4 text-red-500 font-bold text-lg">Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
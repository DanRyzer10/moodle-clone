import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GoogleButton } from '../../components/common/google-button';
import { IMAGE_URL, AUTH_STORAGE_KEY } from '../../core/constants';
import { AppContext } from '../../core/app-context';
import { CustomInput } from '../../components/common/input';
import * as SecureStore from 'expo-secure-store';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authService = AppContext.authService;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const response = await authService.handleGoogleLogin();
      console.log('Auth Response:', response);
    } catch (error) {
      console.error('Google Sign In error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.handleloginOld(username, password);
      
      const sessionData = JSON.stringify({
        token: response.token,
        firstname: response.firstname,
        lastname: response.lastname,
        email: response.email,
        picture: response.picture,
      });

      if (Platform.OS === 'web') {
        localStorage.setItem(AUTH_STORAGE_KEY, sessionData);
      } else {
        await SecureStore.setItemAsync(AUTH_STORAGE_KEY, sessionData);
      }

      console.log('Login exitoso:', response);
      

      Alert.alert("Éxito", "Sesión iniciada. Reinicia la app si no redirige.");

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Error de Red", "No se pudo conectar con el servidor de DigitalOcean.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="relative w-full h-56 bg-primary/5 dark:bg-primary/10 rounded-b-[40px] overflow-hidden">
            <LinearGradient
              colors={['rgba(19, 91, 236, 0.1)', 'transparent']}
              className="absolute inset-0"
            />
            
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full" style={{ opacity: 0.3 }} />
            <View className="absolute -left-10 top-10 w-32 h-32 bg-purple-500/10 rounded-full" style={{ opacity: 0.3 }} />
            
            <View className="relative h-full flex-col items-center justify-end pb-6 px-6">
              <Image
                source={{ uri: IMAGE_URL }}
                className="w-full h-40"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="px-6 pt-6 pb-8">
            <View className="text-center mb-8">
              <Text className="text-slate-900 dark:text-white text-3xl font-bold text-center mb-2">
                Bienvenido de nuevo
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 text-base text-center">
                Inicia sesión para continuar
              </Text>
            </View>

            <View className="space-y-4">
              <CustomInput
                label='Usuario'
                value={username}
                onChangeText={setUsername}
                placeholder='Ingresa tu usuario'
                icon='person'
              />
              <CustomInput
                label='Contraseña'
                value={password}
                onChangeText={setPassword}
                placeholder='Ingresa tu contraseña'
                icon='lock'
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              onPress={handleLogin}
              disabled={loading}
              className={`mt-6 h-14 rounded-2xl flex-row items-center justify-center ${loading ? 'bg-slate-300' : 'bg-primary'}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-lg font-bold">Entrar</Text>
              )}
            </TouchableOpacity>

            <View className="relative my-8">
              <View className="absolute inset-0 flex items-center">
                <View className="w-full border-t border-slate-200 dark:border-slate-700" />
              </View>
              <View className="relative flex justify-center">
                <Text className="px-4 bg-white dark:bg-background-dark text-slate-500 dark:text-slate-400 text-sm">
                  O continúa con
                </Text>
              </View>
            </View>

            <GoogleButton
              onPress={handleGoogleSignIn}
              loading={loading}
              disabled={loading}
            />

            <View className="mt-8">
              <Text className="text-sm text-slate-600 dark:text-slate-400 text-center">
                ¿Eres nuevo aquí?{' '}
                <Text
                  onPress={handleSignUp}
                  className="font-semibold text-primary"
                >
                  Crea una cuenta
                </Text>
              </Text>
            </View>

            <View className="h-8" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
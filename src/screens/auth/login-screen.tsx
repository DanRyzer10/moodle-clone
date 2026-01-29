import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomInput } from '../../components/common/input';
import { GoogleButton } from '../../components/common/google-button';
import { IMAGE_URL } from '../../core/constants';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Login with:', { email, password });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      console.log('Google Sign In');
    } catch (error) {
      console.error('Google Sign In error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
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
            
         
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full" 
                  style={{ opacity: 0.3 }} />
            <View className="absolute -left-10 top-10 w-32 h-32 bg-purple-500/10 rounded-full" 
                  style={{ opacity: 0.3 }} />
            
         
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
                Inicia Sesion para continuar
              </Text>
            </View>
            <View className="relative my-8">
              <View className="absolute inset-0 flex items-center">
                <View className="w-full border-t border-slate-200 dark:border-slate-700" />
              </View>
              <View className="relative flex justify-center">
                <Text className="px-4 bg-white dark:bg-background-dark text-slate-500 dark:text-slate-400 text-sm text-center">
                  Continua con
                </Text>
              </View>
            </View>

            <GoogleButton onPress={handleGoogleSignIn} loading={loading} />
            <View className="mt-8">
              <Text className="text-sm text-slate-600 dark:text-slate-400 text-center">
                New here?{' '}
                <Text
                  onPress={handleSignUp}
                  className="font-semibold text-primary"
                >
                  Create an Account
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
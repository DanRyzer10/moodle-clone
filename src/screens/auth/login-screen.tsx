import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StatusBar,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleButton } from '../../components/common/GoogleButton';

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-6">
          
          <View className="items-center mb-12">
            <View className="w-32 h-32 bg-primary rounded-3xl items-center justify-center mb-4 shadow-lg">
              <Text className="text-white text-5xl font-bold">M</Text>
            </View>
            
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Moodle Clone
            </Text>
            <Text className="text-gray-500 text-center">
            </Text>
          </View>

          <View className="w-full max-w-sm">
            <GoogleButton 
              onPress={handleGoogleSignIn}
              loading={loading}
            />
          </View>
          <View className="absolute bottom-8">
            <Text className="text-gray-400 text-sm">
              Versión 1.0.0
            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
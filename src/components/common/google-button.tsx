import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

interface GoogleButtonProps {
  onPress: () => void;
  loading?: boolean;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ 
  onPress, 
  loading = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className="bg-white border border-gray-300 rounded-lg px-6 py-4 flex-row items-center justify-center shadow-sm active:bg-gray-50"
    >
      {loading ? (
        <ActivityIndicator size="small" color="#4285F4" />
      ) : (
        <>
          {/* Google Icon SVG */}
          <View className="mr-3">
            <Text style={{ fontSize: 24 }}>G</Text>
            {/* Aquí irá el SVG del logo de Google */}
          </View>
          <Text className="text-gray-700 font-semibold text-base">
            Continuar con Google
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
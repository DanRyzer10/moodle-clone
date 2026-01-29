import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = 'default',
  showForgotPassword = false,
  onForgotPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="space-y-2">
      {/* Label y Forgot Password */}
      <View className="flex-row justify-between items-center px-1">
        <Text className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </Text>
        {showForgotPassword && (
          <TouchableOpacity onPress={onForgotPassword}>
            <Text className="text-xs font-semibold text-primary">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Input Container */}
      <View className="relative">
        {/* Left Icon */}
        <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
          <MaterialIcons name={icon} size={20} color="#94a3b8" />
        </View>


        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white"
        />

        {/* Right Icon (Password Toggle) */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-0 bottom-0 justify-center"
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
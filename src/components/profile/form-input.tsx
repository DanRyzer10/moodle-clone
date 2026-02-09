import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address';
  editable?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  editable = true,
}) => {
  return (
    <View className="flex-row items-center gap-3 px-4 py-1 border-b border-slate-100 dark:border-slate-700/50 last:border-b-0">
      <Text className="w-24 shrink-0 text-base font-medium text-slate-900 dark:text-white">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
        className="flex-1 border-0 bg-transparent py-3 text-right text-slate-600 dark:text-slate-300 text-sm"
      />
    </View>
  );
};
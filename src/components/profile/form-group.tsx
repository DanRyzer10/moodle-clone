import React from 'react';
import { View } from 'react-native';

interface FormGroupProps {
  children: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children }) => {
  return (
    <View className="overflow-hidden rounded-xl bg-white dark:bg-[#1e293b] shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
      {children}
    </View>
  );
};
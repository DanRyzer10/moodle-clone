import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SettingItemProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  hasArrow?: boolean;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  hasArrow = false,
  hasToggle = false,
  toggleValue = false,
  onToggle,
  onPress,
}) => {
  const content = (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-b-0">
      <View className="flex-row items-center gap-3">
        <View
          className={`h-8 w-8 items-center justify-center rounded-lg ${iconBgColor}`}
        >
          <MaterialIcons name={icon as any} size={20} color={iconColor} />
        </View>
        <Text className="text-base font-medium text-slate-900 dark:text-white">
          {title}
        </Text>
      </View>

      {hasToggle && (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#cbd5e1', true: '#135bec' }}
          thumbColor="#ffffff"
          ios_backgroundColor="#cbd5e1"
        />
      )}

      {hasArrow && (
        <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
      )}
    </View>
  );

  if (onPress && !hasToggle) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="active:bg-slate-50 dark:active:bg-slate-800"
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};
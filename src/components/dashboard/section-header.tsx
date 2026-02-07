import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 pb-3">
      <Text className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
        {title}
      </Text>
      {actionText && onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <Text className="text-primary text-sm font-semibold">
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
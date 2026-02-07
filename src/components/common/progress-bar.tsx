import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
}) => {
  return (
    <View className="w-full">
      {showPercentage && (
        <View className="flex-row justify-between mb-1.5">
          <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Progress
          </Text>
          <Text className="text-xs font-bold text-primary">{progress}%</Text>
        </View>
      )}
      <View className="w-full bg-slate-100 dark:bg-gray-700 rounded-full h-2">
        <View
          className="bg-primary h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UserInfo } from '../../core/types';


interface DashboardHeaderProps {
  user: UserInfo;
  onNotificationPress: () => void;
  onAvatarPress: () => void;
  hasNotifications?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  onNotificationPress,
  onAvatarPress,
  hasNotifications = false,
}) => {
  return (
    <View className="bg-background-light/95 dark:bg-background-dark/95 px-4 pt-6 pb-2">
      <View className="flex-row items-center justify-between">
        {/* User Info */}
        <View className="flex-row items-center gap-3">
          <View className="relative">
            <TouchableOpacity onPress={onAvatarPress}>
              <Image
                source={{ uri: user.picture }}
                className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-700"
              />
            </TouchableOpacity>
            {user.email && (
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-background-dark" />
            )}
          </View>
          <View>
            <Text className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              {user.firstname} {user.lastname}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-xs font-normal">
              Let's learn something new today.
            </Text>
          </View>
        </View>

        {/* Notifications Button */}
        <TouchableOpacity
          onPress={onNotificationPress}
          className="relative w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700"
        >
          <MaterialIcons
            name="notifications-none"
            size={24}
            color="#475569"
          />
          {hasNotifications && (
            <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
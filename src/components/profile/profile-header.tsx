import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UserProfile } from '../../core/types'; 
interface ProfileHeaderProps {
  user: UserProfile;
  onEditPhoto: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditPhoto,
}) => {
  const fullName = `${user.name}`;
  
  return (
    <View className="flex-col items-center justify-center pt-2">
      {/* Avatar with Edit Button */}
      <View className="relative">
        <View className="h-28 w-28 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-lg">
          <Image
            source={{ uri: user.picture }}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          onPress={onEditPhoto}
          className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md active:bg-blue-600"
        >
          <MaterialIcons name="edit" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View className="mt-4 flex-col items-center gap-1">
        <Text className="text-xl font-bold text-slate-900 dark:text-white">
          {fullName}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {user.email}
          </Text>
          <View className="flex-row items-center rounded-full bg-primary/10 px-2 py-0.5 ring-1 ring-primary/20">
            <Text className="text-xs font-medium text-primary">
              {'Estudiante'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
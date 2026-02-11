import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ForumThread } from '../../core/types'; 

interface ForumThreadCardProps {
  thread: ForumThread;
  onPress: () => void;
}

export const ForumThreadCard: React.FC<ForumThreadCardProps> = ({
  thread,
  onPress,
}) => {
  const isPinned = thread.isPinned;

  if (isPinned) {
    return (
      <View className="mx-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
        <View className="flex-row items-start gap-3">
          <View className="mt-1">
            <MaterialIcons name="campaign" size={20} color="#135bec" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {thread.title}
            </Text>
            <Text
              className="text-xs text-slate-600 dark:text-slate-300"
              numberOfLines={2}
            >
              {thread.content}
            </Text>
            <View className="mt-2 flex-row items-center gap-2">
              {thread.author.avatar && (
                <Image
                  source={{ uri: thread.author.avatar }}
                  className="h-5 w-5 rounded-full ring-2 ring-white dark:ring-slate-900"
                />
              )}
              <Text className="text-xs font-medium text-primary dark:text-blue-400">
                {thread.author.name}
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                •
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                {thread.timeAgo}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="mx-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm active:bg-slate-50 dark:active:bg-slate-700"
    >
      <View className="flex-row justify-between items-start mb-1">
        <Text
          className="text-base font-semibold text-slate-900 dark:text-white flex-1"
          numberOfLines={1}
        >
          {thread.title}
        </Text>
        {thread.newReplies && thread.newReplies > 0 && (
          <View className="shrink-0 w-5 h-5 items-center justify-center rounded-full bg-primary">
            <Text className="text-white text-[10px] font-bold">
              {thread.newReplies}
            </Text>
          </View>
        )}
      </View>

      <Text
        className="text-sm text-slate-500 dark:text-slate-400 mb-3"
        numberOfLines={2}
      >
        {thread.content}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {thread.author.avatar ? (
            <Image
              source={{ uri: thread.author.avatar }}
              className="h-6 w-6 rounded-full bg-slate-200"
            />
          ) : (
            <View className="h-6 w-6 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
              <Text className="text-[10px] font-bold text-pink-600 dark:text-pink-300">
                {thread.author.initials}
              </Text>
            </View>
          )}
          <View>
            <Text className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {thread.author.name}
            </Text>
            <Text className="text-[10px] text-slate-400">
              {thread.timeAgo}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1 text-slate-400">
          <MaterialIcons
            name="chat-bubble-outline"
            size={16}
            color="#94a3b8"
          />
          <Text className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {thread.repliesCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
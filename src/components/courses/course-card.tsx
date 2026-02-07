import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Course } from '../../core/types';
import { ProgressBar } from '../common/progress-bar';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
  onMenuPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onPress,
  onMenuPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-gray-700 flex-row gap-4"
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: course.courseimage }}
        className="w-24 h-24 rounded-lg"
        resizeMode="cover"
      />

      {/* Content */}
      <View className="flex-1 h-24 justify-between py-0.5">
        {/* Header */}
        <View>
          <View className="flex-row justify-between items-start">
            <Text className="text-slate-900 dark:text-white text-base font-bold leading-tight flex-1">
              {course.displayname}
            </Text>
            <TouchableOpacity onPress={onMenuPress}>
              <MaterialIcons
                name="more-horiz"
                size={20}
                color="#cbd5e1"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-slate-500 dark:text-slate-400 text-xs font-medium">
            {course.idnumber} • {course.summary}
          </Text>
        </View>

        {/* Progress */}
        <ProgressBar progress={course.progress} />
      </View>
    </TouchableOpacity>
  );
};
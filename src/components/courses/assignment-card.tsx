import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AssignmentUI } from '../../core/types'; 

interface AssignmentCardProps {
  assignment: AssignmentUI;
  onPress: () => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onPress,
}) => {
  const hasProgress = assignment.progress !== undefined;
  const isCompleted = assignment.status === 'completed';

  const getStatusBadge = () => {
    switch (assignment.status) {
      case 'not-started':
        return (
          <View className="flex-row items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5">
            <Text className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Not Started
            </Text>
          </View>
        );
      case 'in-progress':
        return (
          <View className="flex-row items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5">
            <Text className="text-xs font-medium text-blue-600 dark:text-blue-300">
              In Progress
            </Text>
          </View>
        );
      case 'overdue':
        return (
          <View className="flex-row items-center rounded-full bg-red-50 dark:bg-red-900/30 px-2 py-0.5">
            <Text className="text-xs font-medium text-red-600 dark:text-red-300">
              Overdue
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = () => {
    if (!assignment.priority) return null;

    return (
      <View className="flex-row items-center rounded-full bg-red-50 dark:bg-red-900/30 px-2 py-0.5 ring-1 ring-red-600/10 dark:ring-red-500/20">
        <Text className="text-xs font-medium text-red-600 dark:text-red-300">
          High Priority
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`mx-4 mb-3 flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden ${
        isCompleted ? 'opacity-80' : ''
      }`}
    >
      <View className="flex-row items-start gap-4 p-4">
        {/* Icon */}
        <View
          className={`w-12 h-12 shrink-0 items-center justify-center rounded-xl ${assignment.iconBgColor}`}
        >
          <MaterialIcons
            name={assignment.icon as any}
            size={24}
            color={assignment.iconColor}
          />
        </View>

        {/* Content */}
        <View className="flex-1 gap-1">
          <View className="flex-row justify-between items-start">
            <Text
              className={`text-base font-semibold leading-tight flex-1 pr-2 ${
                isCompleted
                  ? 'text-slate-900 dark:text-white line-through decoration-slate-400'
                  : 'text-slate-900 dark:text-white'
              }`}
              numberOfLines={2}
            >
              {assignment.title}
            </Text>
            {assignment.priority === 'high' && getPriorityBadge()}
            {!assignment.priority && !isCompleted && getStatusBadge()}
            {isCompleted && assignment.grade && (
              <View className="flex-col items-end">
                <Text className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {assignment.grade}/{assignment.maxGrade}
                </Text>
              </View>
            )}
          </View>

          {assignment.description && !isCompleted && (
            <Text
              className="text-slate-500 dark:text-slate-400 text-sm leading-normal"
              numberOfLines={2}
            >
              {assignment.description}
            </Text>
          )}

          {isCompleted && assignment.submittedDate ? (
            <Text className="text-slate-500 dark:text-slate-400 text-xs">
              Submitted {assignment.submittedDate}
            </Text>
          ) : (
            <View className="mt-2 flex-row items-center gap-2">
              <MaterialIcons
                name="calendar-today"
                size={16}
                color="#94a3b8"
              />
              <Text className="text-xs font-medium text-slate-400 dark:text-slate-500">
                Due: {assignment.dueDateFormatted}
              </Text>
              {assignment.daysLeft && (
                <>
                  <View className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <Text
                    className={`text-xs font-medium ${
                      assignment.isOverdue
                        ? 'text-red-500 dark:text-red-400'
                        : 'text-orange-500 dark:text-orange-400'
                    }`}
                  >
                    {assignment.daysLeft}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Progress Bar */}
      {hasProgress && assignment.progress !== undefined && (
        <View className="h-1 w-full bg-slate-100 dark:bg-slate-700">
          <View
            className="h-1 bg-orange-400 rounded-r-full"
            style={{ width: `${assignment.progress}%` }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
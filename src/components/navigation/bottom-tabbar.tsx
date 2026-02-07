import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type TabName = 'Courses' | 'Assignments' | 'Forums' | 'Profile';

interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

interface TabItem {
  name: TabName;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

const tabs: TabItem[] = [
  { name: 'Courses', icon: 'home', label: 'Cursos' },
  { name: 'Assignments', icon: 'assignment', label: 'Tareas' },
  { name: 'Forums', icon: 'forum', label: 'Foros' },
  { name: 'Profile', icon: 'person', label: 'Perfil' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700">
      <View className="flex-row justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => onTabPress(tab.name)}
              className="flex-col items-center justify-center w-full h-full gap-1"
            >
              <MaterialIcons
                name={tab.icon}
                size={26}
                color={isActive ? '#135bec' : '#94a3b8'}
              />
              <Text
                className={`text-[10px] font-medium ${
                  isActive
                    ? 'text-primary'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
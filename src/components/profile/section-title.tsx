import React from 'react';
import { Text } from 'react-native';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <Text className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      {title}
    </Text>
  );
};
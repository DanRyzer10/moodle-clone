import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { SegmentedControl } from '../../components/courses/segmented-control';
import { AssignmentCard } from '../../components/courses/assignment-card'; 
import { ForumThreadCard } from '../../components/courses/forum-thread-card';
import { FloatingActionButton } from '../../components/common/floating-action-button';
import { BottomTabBar } from '../../components/navigation/bottom-tabbar';
import { transformAssignment } from '../../core/utils/assignment-utils';
import { AssignmentUI, ForumThread,Course  } from '../../core/types';

type TabName = 'Courses' | 'Assignments' | 'Forums' | 'Profile';

interface CourseDetailScreenProps {
  course: Course;
  onBack: () => void;
}

export const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({
  course,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabName>('Courses');
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [pendingAssignments, setPendingAssignments] = useState<AssignmentUI[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState<AssignmentUI[]>([]);
  const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);

  useEffect(() => {
    loadCourseData();
  }, [course.id]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      // Aquí llamarías a tu API
      // const response = await fetchAssignments(course.id);
      // const transformed = response.assignments.map(transformAssignment);
      
      // Mock data temporal
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Separar assignments por estado
      // setPendingAssignments(transformed.filter(a => a.status !== 'completed'));
      // setCompletedAssignments(transformed.filter(a => a.status === 'completed'));
      
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentPress = (assignment: AssignmentUI) => {
    console.log('Assignment pressed:', assignment.title);
  };

  const handleThreadPress = (thread: ForumThread) => {
    console.log('Thread pressed:', thread.title);
  };

  const handleFABPress = () => {
    if (selectedSegment === 1) {
      console.log('Create new forum thread');
    }
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
  };

  const renderAssignmentsTab = () => (
    <View className="flex-col gap-1">
      {/* Pending Section */}
      {pendingAssignments.length > 0 && (
        <>
          <View className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 pt-2">
            <Text className="text-slate-900 dark:text-white text-lg font-bold px-4 pb-2">
              Pending
            </Text>
          </View>
          {pendingAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onPress={() => handleAssignmentPress(assignment)}
            />
          ))}
        </>
      )}

      {/* Completed Section */}
      {completedAssignments.length > 0 && (
        <>
          <View className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 pt-4">
            <Text className="text-slate-900 dark:text-white text-lg font-bold px-4 pb-2">
              Completed
            </Text>
          </View>
          {completedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onPress={() => handleAssignmentPress(assignment)}
            />
          ))}
        </>
      )}

      {/* Empty State */}
      {pendingAssignments.length === 0 && completedAssignments.length === 0 && !loading && (
        <View className="flex-1 items-center justify-center py-20">
          <MaterialIcons name="assignment" size={64} color="#cbd5e1" />
          <Text className="text-slate-400 mt-4">No assignments yet</Text>
        </View>
      )}
    </View>
  );

  const renderForumsTab = () => (
    <View className="flex-col gap-3">
      {/* Search Bar */}
      <View className="px-4 mb-2">
        <View className="relative">
          <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <MaterialIcons name="search" size={20} color="#94a3b8" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search topics..."
            placeholderTextColor="#94a3b8"
            className="w-full rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
          />
        </View>
      </View>

      {/* Forum Threads */}
      {forumThreads.map((thread) => (
        <ForumThreadCard
          key={thread.id}
          thread={thread}
          onPress={() => handleThreadPress(thread)}
        />
      ))}

      {/* Empty State */}
      {forumThreads.length === 0 && !loading && (
        <View className="flex-1 items-center justify-center py-20">
          <MaterialIcons name="forum" size={64} color="#cbd5e1" />
          <Text className="text-slate-400 mt-4">No forum threads yet</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle="dark-content" />

      {/* Top App Bar */}
      <View className="flex-row items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
        <TouchableOpacity
          onPress={onBack}
          className="w-10 h-10 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800"
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="#0f172a"
          />
        </TouchableOpacity>

        <Text
          className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center px-2"
          numberOfLines={1}
        >
          {course.shortname}: {course.displayname}
        </Text>

        <TouchableOpacity
          onPress={handleMenuPress}
          className="w-10 h-10 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800"
        >
          <MaterialIcons name="more-horiz" size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* Segmented Control */}
      <SegmentedControl
        segments={['Assignments', 'Forums']}
        selectedIndex={selectedSegment}
        onSegmentChange={setSelectedSegment}
      />

      {/* Main Content */}
      <ScrollView
        className="flex-1 pb-20"
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#135bec" />
          </View>
        ) : (
          <>
            {selectedSegment === 0 && renderAssignmentsTab()}
            {selectedSegment === 1 && renderForumsTab()}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button (solo en Forums) */}
      {selectedSegment === 1 && (
        <FloatingActionButton onPress={handleFABPress} />
      )}

      {/* Bottom Navigation */}
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};
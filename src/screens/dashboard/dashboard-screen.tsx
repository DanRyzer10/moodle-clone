import React, { useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Course,UserInfo} from '../../core/types';
import { CourseCard } from '../../components/courses/course-card';
import { DashboardHeader } from '../../components/dashboard/dashboard-header';
import { SectionHeader } from '../../components/dashboard/section-header';
import { BottomTabBar } from '../../components/navigation/bottom-tabbar';
import { myCourses } from '../../data/data';
import { SearchBar } from '../../components/common/search-bar';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../core/app-context';
import { useAuth } from '../../core/context/auth-context';

type TabName = 'Courses' | 'Assignments' | 'Forums' | 'Profile';

export const DashboardScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabName>('Courses');
  const courseService = AppContext.courseService;

  const user: UserInfo = {
   email : 'mail@mail.com',
   firstname : 'John',
    lastname : 'Doe',
    picture : 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
  };

  const handleCoursePress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('CourseDetail' as never,{ course } as never);
  };

  const handleSeeAll = () => {
    console.log('See all pressed');
  };

  const handleCourseMenu = (course: Course) => {
    console.log('Course menu:', course.id);
  };

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    console.log('Tab pressed:', tab);
  };
  const onAvatarPress = () => {
    navigation.navigate('Profile' as never);
  }

//   const renderContinueLearningItem = ({ item }: { item: Course }) => (
//     <ContinueLearningCard
//       course={item}
//       onPress={() => handleCoursePress(item)}
//     />
//   );

  const renderCourseItem = ({ item }: { item: Course }) => (
    <CourseCard
      course={item}
      onPress={() => handleCoursePress(item)}
      onMenuPress={() => handleCourseMenu(item)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <DashboardHeader
      onAvatarPress={onAvatarPress}
        user={user}
        onNotificationPress={handleNotificationPress}
        hasNotifications={true}
      />

      {/* Main Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Continue Learning Section */}
        <View className="flex-col pt-4">
          <SectionHeader
            title="Continue Learning"
            actionText="See All"
            onActionPress={handleSeeAll}
          />
          {/* <FlatList
            data={continueLearningCourses}
            renderItem={renderContinueLearningItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-4 px-4 pb-2"
          /> */}
        </View>

        {/* My Courses Section */}
        <View className="flex-col pt-6 px-4 pb-24">
          <SectionHeader title="My Courses" />
          <View className="flex-col gap-4">
            {myCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPress={() => handleCoursePress(course)}
                onMenuPress={() => handleCourseMenu(course)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};
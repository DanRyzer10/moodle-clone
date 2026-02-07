import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../core/app-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CourseService } from '../../services/courses/course.service';
import { Assignment } from '../../core/types';

// IMPORTA TU COMPONENTE PERSONALIZADO
import SplashScreen from '../../screens/shared/splash-screen'; 

const courseService = new CourseService();

export const CourseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  
  const { courseId, courseTitle } = route.params as { courseId: string, courseTitle: string };

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const data = await courseService.getAssignmentsByCourse(user.token, courseId);
      setAssignments(data);
    } catch (error) {
      console.error(error);
    } finally {
      // Pequeño delay opcional para que la animación se aprecie si el internet es muy rápido
      setTimeout(() => setLoading(false), 500); 
    }
  };

  useEffect(() => {
    loadData();
  }, [courseId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // --- LÓGICA DEL SPLASH SCREEN ---
  // Si está cargando, retornamos el Splash directamente
  if (loading) {
    return <SplashScreen />; 
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-background-dark">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <MaterialIcons name="arrow-back-ios" size={20} color="#135bec" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold dark:text-white" numberOfLines={1}>
          {courseTitle}
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-900 dark:text-white text-2xl font-bold mb-6">Tareas Disponibles</Text>

        {assignments.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            className="bg-white dark:bg-slate-800 p-5 rounded-[30px] mb-4 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <View className="flex-row gap-4 items-center">
              <div className="size-12 bg-primary/10 rounded-2xl items-center justify-center">
                <MaterialIcons name="assignment" size={24} color="#135bec" />
              </div>
              <View className="flex-1">
                <Text className="text-slate-900 dark:text-white font-bold text-base">{item.title}</Text>
                <View className="flex-row items-center mt-1">
                  <MaterialIcons name="access-time" size={14} color="#94a3b8" />
                  <Text className="text-slate-400 text-xs ml-1">
                    Límite: {formatDate(item.dueDate)}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Mensaje si no hay datos */}
        {assignments.length === 0 && (
          <View className="items-center mt-10">
            <MaterialIcons name="folder-open" size={48} color="#cbd5e1" />
            <Text className="text-slate-400 mt-2">No se encontraron tareas</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
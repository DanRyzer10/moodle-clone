import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  RefreshControl,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../core/app-context';
import { Course } from '../../core/types';
import { CourseService } from '../../services/courses/course.service';
import SplashScreen from '../../screens/shared/splash-screen'; 

const courseService = new CourseService();

export const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { user, isLoading: authLoading } = useAuth();
  
  // Estados para los cursos
  const [allCourses, setAllCourses] = useState<Course[]>([]); // Lista maestra
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Lista para búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estados para la creación de curso
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchCourses = async () => {
    if (!user?.token) return;
    try {
      const data = await courseService.getAllCourses(user.token);
      setAllCourses(data);
      setFilteredCourses(data); // Inicialmente mostramos todos
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    } finally {
      setLoadingCourses(false);
      setRefreshing(false);
    }
  };

  // Lógica de búsqueda funcional (Lupa)
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCourses(allCourses);
    } else {
      const filtered = allCourses.filter(course => 
        course.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const handleCreateCourse = async () => {
    if (!newCourseName.trim() || !user?.token) {
      Alert.alert("Error", "El nombre del curso es obligatorio");
      return;
    }

    setIsCreating(true);
    try {
      await courseService.createCourse(user.token, {
        fullname: newCourseName,
        shortname: newCourseName.substring(0, 10).replace(/\s/g, '') + Math.floor(Math.random() * 100),
        categoryid: 1 
      });
      
      Alert.alert("Éxito", "Curso creado correctamente");
      setNewCourseName('');
      setIsModalVisible(false);
      fetchCourses(); 
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el curso en DigitalOcean");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
  };

  if (authLoading || (loadingCourses && !refreshing)) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-background-dark">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#135bec"]} tintColor="#135bec" />
        }
      >
        {/* Header con Navegación al Perfil */}
        <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
            className="flex-row items-center gap-3"
          >
            <Image 
              source={{ uri: user?.picture || 'https://ui-avatars.com/api/?name=' + user?.firstname }} 
              className="size-12 rounded-full border-2 border-white shadow-sm"
            />
            <View>
              <Text className="text-slate-900 dark:text-white text-lg font-bold">
                ¡Hola, {user?.firstname || 'Estudiante'}!
              </Text>
              <Text className="text-slate-500 text-xs italic">Ver mi perfil</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-100">
            <MaterialIcons name="notifications-none" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Buscador Funcional */}
        <View className="px-6 py-4">
          <View className="flex-row items-center bg-white dark:bg-slate-800 rounded-2xl px-4 border border-slate-100 shadow-sm">
            <MaterialIcons name="search" size={20} color="#135bec" />
            <TextInput 
              placeholder="Buscar en mis cursos..."
              value={searchQuery}
              onChangeText={handleSearch}
              className="flex-1 py-3 ml-2 text-slate-900 dark:text-white"
              placeholderTextColor="#94a3b8"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <MaterialIcons name="close" size={20} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Tarjetas de Resumen */}
        <View className="px-6 flex-row gap-4 mb-6">
          <View className="flex-1 bg-primary rounded-3xl p-5 shadow-lg shadow-primary/30">
            <Text className="text-white/70 text-xs font-bold uppercase">Cursos</Text>
            <Text className="text-white text-3xl font-black">{allCourses.length}</Text>
          </View>
          <View className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-100">
            <Text className="text-slate-400 text-xs font-bold uppercase">Estado</Text>
            <Text className="text-green-500 text-lg font-black mt-2">En línea</Text>
          </View>
        </View>

        {/* Listado de Cursos Filtrado */}
        <View className="px-6 pb-24">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-slate-900 dark:text-white text-xl font-bold">Cursos Activos</Text>
            {searchQuery !== '' && (
              <Text className="text-primary text-xs font-bold">{filteredCourses.length} encontrados</Text>
            )}
          </View>
          
          {filteredCourses.length === 0 ? (
            <View className="items-center py-10">
              <MaterialIcons name="search-off" size={48} color="#cbd5e1" />
              <Text className="text-slate-400 mt-2">No se encontraron cursos</Text>
            </View>
          ) : (
            filteredCourses.map((course) => (
              <TouchableOpacity 
                key={course.id}
                onPress={() => navigation.navigate('Course', { 
                  courseId: course.id, 
                  courseTitle: course.title 
                })}
                className="bg-white dark:bg-slate-800 rounded-3xl p-4 mb-4 border border-slate-100 flex-row gap-4"
              >
                <View className="size-14 bg-primary/10 rounded-2xl items-center justify-center">
                  <Text className="text-primary font-bold text-lg">{course.title.charAt(0).toUpperCase()}</Text>
                </View>
                <View className="flex-1 justify-center">
                  <Text className="text-slate-900 dark:text-white font-bold text-base" numberOfLines={1}>
                    {course.title}
                  </Text>
                  <Text className="text-slate-500 text-xs mt-1">ID Moodle: {course.id}</Text>
                </View>
                <View className="justify-center">
                  <MaterialIcons name="chevron-right" size={24} color="#135bec" />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-8 right-8 size-16 bg-primary rounded-full items-center justify-center shadow-xl shadow-primary/40"
      >
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* MODAL (Se mantiene igual, pero con mejoras de estilo) */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-slate-900 rounded-t-[40px] p-8">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold dark:text-white">Nuevo Curso</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <Text className="text-slate-500 mb-2 font-bold">Nombre del curso</Text>
            <TextInput
              value={newCourseName}
              onChangeText={setNewCourseName}
              placeholder="Ej: Programación Móvil II"
              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl mb-6 dark:text-white border border-slate-100"
              placeholderTextColor="#94a3b8"
            />

            <TouchableOpacity 
              onPress={handleCreateCourse}
              disabled={isCreating}
              className={`h-14 rounded-2xl items-center justify-center ${isCreating ? 'bg-slate-300' : 'bg-primary'}`}
            >
              {isCreating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Guardar en Moodle</Text>
              )}
            </TouchableOpacity>
            <View className="h-4" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
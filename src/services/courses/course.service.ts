import { BACKEND_URL } from '../../core/constants';
import { Course, Assignment } from '../../core/types';

export class CourseService {

  
  async getAllCourses(token: string): Promise<Course[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al obtener cursos');
      return await response.json();
    } catch (error) {
      console.error('CourseService getAllCourses error:', error);
      throw error;
    }
  }

  /**
   * Obtiene las tareas de un curso específico (Para CourseContent)
   */
  async getAssignmentsByCourse(token: string, courseId: string): Promise<Assignment[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/assignments?courseId=${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al obtener tareas');
      return await response.json();
    } catch (error) {
      console.error('CourseService getAssignments error:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo curso en el servidor
   */
    async createCourse(token: string, courseData: any): Promise<Course> {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/courses`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        });

        const textData = await response.text();
        console.log('Respuesta bruta del servidor:', textData);

        if (!response.ok) {
          throw new Error(`Error del servidor (${response.status}): ${textData}`);
        }
        return JSON.parse(textData);

      } catch (error) {
        console.error('CourseService createCourse error:', error);
        throw error;
      }
    }
}
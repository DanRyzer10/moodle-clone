import { BACKEND_URL } from '../../core/constants';
import { UserProfile, CreateUserRequest } from '../../core/types';

export class UserService {

  async getUserInfo(token: string): Promise<UserProfile> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener la información del usuario');
      }

      return await response.json();
    } catch (error) {
      console.error('UserService getUserInfo error:', error);
      throw error;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<any> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        
        const errorBody = await response.text();
        throw new Error(`Error al crear usuario: ${errorBody || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('UserService createUser error:', error);
      throw error;
    }
  }
}
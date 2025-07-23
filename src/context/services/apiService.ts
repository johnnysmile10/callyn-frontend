import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
})

api.interceptors.response.use((res) => {
  if (res.status === 401) {
    toast.error('Not authorized');
    ApiService.setToken(null);
  }
  return res;
})

class ApiService {
  static async get(endpoint, params = {}) {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  static async post(endpoint, data = {}) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  static async patch(endpoint, data = {}) {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('PATCH request failed:', error);
      throw error;
    }
  }

  static async put(endpoint, data = {}) {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  static async delete(endpoint, params = {}) {
    try {
      const response = await api.delete(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  static setToken(token: string | null) {
    if (!token) {
      delete api.defaults.headers['Authorization']
    } else {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }
}

export default ApiService;

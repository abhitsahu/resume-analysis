import api from './api';

export const authService = {
  async register({ name, email, password }) {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data.data;
  },

  async login({ email, password }) {
    const { data } = await api.post('/auth/login', { email, password });
    return data.data;
  },

  async getProfile() {
    const { data } = await api.get('/auth/me');
    return data.data;
  },

  async updateProfile(updateData) {
    const { data } = await api.put('/auth/profile', updateData);
    return data.data;
  },
};

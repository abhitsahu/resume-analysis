import api from './api';

export const resumeService = {
  async uploadResume(file) {
    const formData = new FormData();
    formData.append('resume', file);
    const { data } = await api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async analyzeFromURL(url) {
    const { data } = await api.post('/resume/enrich', { url });
    return data.data;
  },

  async getResumes(page = 1, limit = 10) {
    const { data } = await api.get(`/resume?page=${page}&limit=${limit}`);
    return data.data;
  },

  async getResumeById(id) {
    const { data } = await api.get(`/resume/${id}`);
    return data.data;
  },

  async getStats() {
    const { data } = await api.get('/resume/stats');
    return data.data;
  },

  async searchResumes(name) {
    const { data } = await api.post('/resume/search', { name });
    return data.data;
  },
};

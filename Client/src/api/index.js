import api from './axiosInstance';

export const storiesApi = {
  getAll: (params) => api.get('/stories', { params }),
  getById: (id) => api.get(`/stories/${id}`),
  toggleBookmark: (id) => api.post(`/stories/${id}/bookmark`),
  getBookmarks: () => api.get('/bookmarks'),
  triggerScrape: () => api.post('/scrape'),
};

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

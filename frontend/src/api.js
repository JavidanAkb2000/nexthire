import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Her istekten önce çalışacak "Gümrük Memuru" (Interceptor)
api.interceptors.request.use(
  (config) => {
    // Tarayıcının hafızasından token'ı (yaka kartını) al
    const token = localStorage.getItem('access_token');
    if (token) {
      // Eğer token varsa, bunu backend'e giden isteğin başlığına ekle
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
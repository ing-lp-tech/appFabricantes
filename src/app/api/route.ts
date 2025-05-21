import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error de API:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta:", error.request);
      return Promise.reject({ message: "No se pudo conectar al servidor" });
    } else {
      console.error("Error de configuración:", error.message);
      return Promise.reject({
        message: "Error de configuración de la solicitud",
      });
    }
  }
);

export default api;

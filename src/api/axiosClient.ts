import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erro na resposta da API:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Nenhuma resposta recebida:", error.request);
    } else {
      console.error("Erro ao configurar requisição:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

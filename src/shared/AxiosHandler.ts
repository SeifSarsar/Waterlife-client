import axios, { AxiosRequestConfig } from 'axios';

export default class AxiosHandler {
  static get(url: string, config?: AxiosRequestConfig) {
    const endpoint =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://waterlifeserver.herokuapp.com';

    return axios.get(`${endpoint}${url}`, config);
  }
  static post(url: string, data?: any, config?: AxiosRequestConfig) {
    const endpoint =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://waterlifeserver.herokuapp.com';

    return axios.post(`${endpoint}${url}`, data, config);
  }

  static put(url: string, data?: any, config?: AxiosRequestConfig) {
    const endpoint =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://waterlifeserver.herokuapp.com';

    return axios.put(`${endpoint}${url}`, data, config);
  }

  static delete(url: string, config?: AxiosRequestConfig) {
    const endpoint =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://waterlifeserver.herokuapp.com';

    return axios.delete(`${endpoint}${url}`, config);
  }
}

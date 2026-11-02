import axiosInstance from "./AxiosConfig";
import type { AxiosRequestConfig } from "axios";

class ApiClient {
  async get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await axiosInstance.get<T>(url, { params, ...config });
    return res.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await axiosInstance.put<T>(url, data, config);
    return res.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await axiosInstance.patch<T>(url, data, config);
    return res.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data;
  }
}

const apiClient = new ApiClient();

export default apiClient;

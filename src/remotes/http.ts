import axios, { AxiosRequestConfig } from "axios";
import { ensureEnv } from "../apis/utils/ensureEnv";

export function get<R>(url: string) {
  const BASE_URL = ensureEnv("NEXT_PUBLIC_BASE_URL");

  return axios.get<R>(`${BASE_URL}${url}`);
}

export function post<B, R>(
  url: string,
  body?: B,
  options?: AxiosRequestConfig
) {
  const BASE_URL = ensureEnv("NEXT_PUBLIC_BASE_URL");

  return axios.post<R>(`${BASE_URL}${url}`, body, options);
}

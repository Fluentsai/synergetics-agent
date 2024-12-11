import axios, { AxiosRequestConfig } from 'axios'

const API_BASE = 'https://api.fluents.ai'

const getConfig = (
  token: string,
  options: AxiosRequestConfig = {}
): AxiosRequestConfig => {
  return {
    baseURL: API_BASE,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    ...options,
  }
}

export const post = async (apiKey: string, url: string, data: object) => {
  return axios.request(
    getConfig(apiKey, {
      method: 'POST',
      url,
      data,
    })
  )
}

export const get = async (apiKey: string, url: string) => {
  return axios.request(
    getConfig(apiKey, {
      method: 'GET',
      url,
    })
  )
}

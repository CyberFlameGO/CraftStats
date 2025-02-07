import type { AxiosResponse } from 'axios'

import axios from 'axios'

export const apiBaseUrl = '/api'

export type RecentServersStats = {
  [serverId: string]: { [timestamp: string]: number }
}

export interface ServerDescription {
  id: string
  name: string
  type?: 'JAVA' | 'BEDROCK'
  address: string
  color?: string
  version?: string
}

export interface ServerStats {
  serverId: string
  stats: { [date: string]: DailyServerStats }
}

export interface DailyServerStats {
  [time: string]: number
}

export async function fetchServers(): Promise<ServerDescription[]> {
  const response = await axios.get(apiBaseUrl + '/servers')

  return response.data
}

export async function fetchStats(): Promise<ServerStats[]> {
  const response = await axios.get(apiBaseUrl + '/servers/stats')

  return response.data
}

export async function fetchRecentStats(): Promise<RecentServersStats> {
  const response = await axios.get(apiBaseUrl + '/servers/stats/recent')

  return response.data
}

export function saveServers(
  token: string,
  servers: ServerDescription[],
): Promise<AxiosResponse<Record<string, string>>> {
  const json = JSON.stringify({ token, servers })

  return axios.post(apiBaseUrl + '/servers/update', json)
}

export async function uploadServerIcons(
  token: string,
  icons: Record<string, string>,
): Promise<AxiosResponse<Record<string, string>>> {
  const json = JSON.stringify({ token, icons })

  return axios.post(apiBaseUrl + '/servers/icons', json)
}

export function encodeFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

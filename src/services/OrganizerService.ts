import type { AxiosResponse } from 'axios'
import apiClient from './AxiosClient'
import type { EventOrganizer } from '@/type'


export default {
  getOrganizers(): Promise<AxiosResponse<EventOrganizer[]>> {
    return apiClient.get<EventOrganizer[]>(`/organizers`)
  }
}

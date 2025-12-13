import apiClient from "./client"

export interface Facility {
  id: number
  name: string
  description?: string
  capacity?: number
}

export interface CreateFacilityDto {
  name: string
  description?: string
  capacity?: number
}

export interface UpdateFacilityDto {
  name: string
  description?: string
  capacity?: number
}

export const getFacilities = async (): Promise<Facility[]> => {
  const response = await apiClient.get<Facility[]>("/api/facilities")
  return response.data
}

export const getFacility = async (id: number): Promise<Facility> => {
  const response = await apiClient.get<Facility>(`/api/facilities/${id}`)
  return response.data
}

export const createFacility = async (data: CreateFacilityDto): Promise<Facility> => {
  const response = await apiClient.post<Facility>("/api/facilities", data)
  return response.data
}

export const updateFacility = async (id: number, data: UpdateFacilityDto): Promise<Facility> => {
  const response = await apiClient.put<Facility>(`/api/facilities/${id}`, data)
  return response.data
}

export const deleteFacility = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/facilities/${id}`)
}

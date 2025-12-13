import apiClient from "./client"

export interface Booking {
  id: number
  start_time: string
  end_time: string
  facility_id: number
  user_id?: number
}

export interface CreateBookingDto {
  startTime: string
  endTime: string
  facilityId: number
  userId?: number
}

export const getBookings = async (): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>("/api/bookings")
  return response.data
}

export const createBooking = async (data: CreateBookingDto): Promise<Booking> => {
  const response = await apiClient.post<Booking>("/api/bookings", data)
  return response.data
}

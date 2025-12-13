import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - please try again")
    }
    if (error.code === "ERR_NETWORK") {
      throw new Error("Network error - please check your connection")
    }
    if (error.response) {
      const message = error.response.data?.message || error.response.statusText
      throw new Error(message)
    }
    throw error
  },
)

export default apiClient

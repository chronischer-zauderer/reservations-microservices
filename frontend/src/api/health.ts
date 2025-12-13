import apiClient from "./client"

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get("/api/facilities", { timeout: 3000 })
    return true
  } catch {
    return false
  }
}

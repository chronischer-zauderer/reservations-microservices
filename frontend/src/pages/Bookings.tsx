"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Calendar, Building2, Clock } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { getBookings, type Booking } from "../api/bookings"
import { getFacilities, type Facility } from "../api/facilities"
import Button from "../components/Button"
import Loader from "../components/Loader"
import Alert from "../components/Alert"

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [bookingsData, facilitiesData] = await Promise.all([getBookings(), getFacilities()])
      setBookings(bookingsData)
      setFacilities(facilitiesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings")
      toast.error("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getFacilityName = (facilityId: number) => {
    const facility = facilities.find((f) => f.id === facilityId)
    return facility?.name || `Facility #${facilityId}`
  }

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch {
      return dateString
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">View and manage all reservations</p>
        </div>
        <Link to="/bookings/new">
          <Button variant="primary">
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </Link>
      </div>

      {loading && <Loader text="Loading bookings..." />}

      {error && <Alert type="error" message={error} />}

      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-12 bg-secondary rounded-xl">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">Create your first booking to get started</p>
          <Link to="/bookings/new">
            <Button variant="primary">
              <Plus className="w-4 h-4" />
              Create First Booking
            </Button>
          </Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Facility
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    User ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">#{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{getFacilityName(booking.facility_id)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{formatDateTime(booking.start_time)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{formatDateTime(booking.end_time)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {booking.user_id || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings

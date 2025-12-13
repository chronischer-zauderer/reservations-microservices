"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash2, Building2, Users } from "lucide-react"
import { toast } from "sonner"
import { getFacilities, deleteFacility, type Facility } from "../api/facilities"
import Button from "../components/Button"
import Loader from "../components/Loader"
import Alert from "../components/Alert"

const Facilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFacilities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getFacilities()
      setFacilities(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load facilities")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFacilities()
  }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      await deleteFacility(id)
      toast.success("Facility deleted successfully")
      loadFacilities()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete facility")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Facilities</h1>
          <p className="text-muted-foreground mt-1">Manage all your available facilities</p>
        </div>
        <Link to="/facilities/new">
          <Button variant="primary">
            <Plus className="w-4 h-4" />
            Add Facility
          </Button>
        </Link>
      </div>

      {loading && <Loader text="Loading facilities..." />}

      {error && <Alert type="error" message={error} />}

      {!loading && !error && facilities.length === 0 && (
        <div className="text-center py-12 bg-secondary rounded-xl">
          <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No facilities yet</h3>
          <p className="text-muted-foreground mb-6">Get started by adding your first facility</p>
          <Link to="/facilities/new">
            <Button variant="primary">
              <Plus className="w-4 h-4" />
              Add First Facility
            </Button>
          </Link>
        </div>
      )}

      {!loading && !error && facilities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{facility.name}</h3>
                </div>
              </div>

              {facility.description && (
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{facility.description}</p>
              )}

              {facility.capacity && (
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Capacity: {facility.capacity}</span>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-border">
                <Link to={`/facilities/${facility.id}/edit`} className="flex-1">
                  <Button variant="secondary" className="w-full">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(facility.id, facility.name)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Facilities

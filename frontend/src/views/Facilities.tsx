import { Link } from "react-router-dom"
import Button from "../components/Button"

const Facilities = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Facilities</h1>
      </div>
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold">Conference Room A</h3>
          <p className="text-muted-foreground">Capacity: 20</p>
        </div>
      </div>
      <div className="mt-6">
        <Link to="/facilities/new">
          <Button variant="primary">Add Facility</Button>
        </Link>
      </div>
    </div>
  )
}

export default Facilities

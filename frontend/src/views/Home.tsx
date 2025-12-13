import { Link } from "react-router-dom"
import { Building2, Calendar, Plus, List } from "lucide-react"
import Button from "../components/Button"

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to BookingHub</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your facility bookings efficiently. Browse available facilities, create new bookings, and track all
          your reservations in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Facilities</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            View and manage all available facilities. Add new facilities or edit existing ones.
          </p>
          <div className="flex gap-3">
            <Link to="/facilities" className="flex-1">
              <Button variant="secondary" className="w-full">
                <List className="w-4 h-4" />
                View All
              </Button>
            </Link>
            <Link to="/facilities/new" className="flex-1">
              <Button variant="primary" className="w-full">
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Bookings</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            View all bookings and create new reservations for your facilities.
          </p>
          <div className="flex gap-3">
            <Link to="/bookings" className="flex-1">
              <Button variant="secondary" className="w-full">
                <List className="w-4 h-4" />
                View All
              </Button>
            </Link>
            <Link to="/bookings/new" className="flex-1">
              <Button variant="primary" className="w-full">
                <Plus className="w-4 h-4" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-secondary rounded-xl p-8 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-foreground mb-3">Quick Start Guide</h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Add your facilities with name, description, and capacity</li>
          <li>Browse available facilities and their details</li>
          <li>Create bookings by selecting a facility and time slot</li>
          <li>View and manage all your bookings in one place</li>
        </ol>
      </div>
    </div>
  )
}

export default Home

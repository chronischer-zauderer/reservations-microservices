import { Link, useLocation } from "react-router-dom"
import { Building2, Calendar, Home } from "lucide-react"
import ApiStatusBadge from "./ApiStatusBadge"

const Navbar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-foreground">
              <Building2 className="w-6 h-6 text-primary" />
              <span>BookingHub</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                to="/facilities"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/facilities")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Facilities
              </Link>

              <Link
                to="/bookings"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/bookings")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Bookings
              </Link>
            </div>
          </div>

          <ApiStatusBadge />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

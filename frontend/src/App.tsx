import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Facilities from "./pages/Facilities"
import FacilityForm from "./pages/FacilityForm"
import Bookings from "./pages/Bookings"
import BookingForm from "./pages/BookingForm"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[hsl(var(--background))]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities/new" element={<FacilityForm />} />
            <Route path="/facilities/:id/edit" element={<FacilityForm />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/new" element={<BookingForm />} />
          </Routes>
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  )
}

export default App

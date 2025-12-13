"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "../components/Navbar"
import Home from "../views/Home"
import Facilities from "../views/Facilities"
import FacilityForm from "../views/FacilityForm"
import Bookings from "../views/Bookings"
import BookingForm from "../views/BookingForm"

export default function Page() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
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

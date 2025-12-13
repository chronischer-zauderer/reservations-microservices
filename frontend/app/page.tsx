"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "../src/components/Navbar"
import Home from "../src/pages/Home"
import Facilities from "../src/pages/Facilities"
import FacilityForm from "../src/pages/FacilityForm"
import Bookings from "../src/pages/Bookings"
import BookingForm from "../src/pages/BookingForm"

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

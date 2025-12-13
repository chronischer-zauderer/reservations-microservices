import { useState } from "react"
import Button from "../components/Button"

const BookingForm = () => {
  const [facility, setFacility] = useState("")
  const [date, setDate] = useState("")

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-xl font-semibold mb-4">Booking Form</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Facility</label>
          <input value={facility} onChange={(e) => setFacility(e.target.value)} className="input mt-1 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className="input mt-1 w-full" />
        </div>
        <Button type="submit">Book</Button>
      </form>
    </div>
  )
}

export default BookingForm

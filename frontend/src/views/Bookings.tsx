import Button from "../components/Button"

const Bookings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold">Sample Booking</h3>
          <p className="text-muted-foreground">Facility: Conference Room A</p>
        </div>
      </div>
      <div className="mt-6">
        <Button variant="primary">Create Booking</Button>
      </div>
    </div>
  )
}

export default Bookings

import { useState } from "react"
import Button from "../components/Button"

const FacilityForm = () => {
  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState(0)

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-xl font-semibold mb-4">Facility Form</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input mt-1 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Capacity</label>
          <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} className="input mt-1 w-full" />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}

export default FacilityForm

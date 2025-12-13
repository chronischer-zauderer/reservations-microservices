"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { createBooking, type CreateBookingDto } from "../api/bookings"
import { getFacilities, type Facility } from "../api/facilities"
import Button from "../components/Button"
import Input from "../components/Input"
import Select from "../components/Select"
import Loader from "../components/Loader"
import Alert from "../components/Alert"

const schema = yup.object({
  facilityId: yup.number().required("Please select a facility").positive(),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test("is-after-start", "End time must be after start time", function (value) {
      const { startTime } = this.parent
      if (!startTime || !value) return true
      return new Date(value) > new Date(startTime)
    }),
  userId: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(),
})

type FormData = yup.InferType<typeof schema>

const BookingForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loadingFacilities, setLoadingFacilities] = useState(true)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      facilityId: undefined,
      startTime: "",
      endTime: "",
      userId: undefined,
    },
  })

  useEffect(() => {
    loadFacilities()
  }, [])

  const loadFacilities = async () => {
    try {
      setLoadingFacilities(true)
      const data = await getFacilities()
      setFacilities(data)
    } catch (err) {
      toast.error("Failed to load facilities")
    } finally {
      setLoadingFacilities(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const payload: CreateBookingDto = {
        facilityId: data.facilityId,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        userId: data.userId || undefined,
      }

      await createBooking(payload)
      toast.success("Booking created successfully")
      navigate("/bookings")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create booking")
    } finally {
      setLoading(false)
    }
  }

  if (loadingFacilities) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader text="Loading facilities..." />
      </div>
    )
  }

  if (facilities.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert type="warning" message="No facilities available. Please add facilities before creating bookings." />
        <div className="mt-4">
          <Button onClick={() => navigate("/facilities")}>Go to Facilities</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/bookings")}
        className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bookings
      </button>

      <div className="bg-white border border-[hsl(var(--border))] rounded-xl p-8">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Create New Booking</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="facilityId"
            control={control}
            render={({ field }) => (
              <Select
                label="Select Facility *"
                options={[
                  { value: "", label: "-- Select a facility --" },
                  ...facilities.map((f) => ({ value: f.id, label: f.name })),
                ]}
                error={errors.facilityId?.message}
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
              />
            )}
          />

          <Input
            label="Start Time *"
            type="datetime-local"
            error={errors.startTime?.message}
            {...register("startTime")}
          />

          <Input label="End Time *" type="datetime-local" error={errors.endTime?.message} {...register("endTime")} />

          <Input
            label="User ID (Optional)"
            type="number"
            placeholder="e.g., 1"
            error={errors.userId?.message}
            {...register("userId")}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => navigate("/bookings")} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} className="flex-1">
              Create Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingForm

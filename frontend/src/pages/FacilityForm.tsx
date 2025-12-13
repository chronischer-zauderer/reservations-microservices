"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { createFacility, updateFacility, getFacility, type CreateFacilityDto } from "../api/facilities"
import Button from "../components/Button"
import Input from "../components/Input"
import Textarea from "../components/Textarea"
import Loader from "../components/Loader"

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  capacity: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Capacity must be a positive number")
    .integer("Capacity must be an integer")
    .nullable(),
})

type FormData = yup.InferType<typeof schema>

const FacilityForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(!!id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (id) {
      loadFacility()
    }
  }, [id])

  const loadFacility = async () => {
    if (!id) return

    try {
      setInitialLoading(true)
      const facility = await getFacility(Number(id))
      reset({
        name: facility.name,
        description: facility.description || "",
        capacity: facility.capacity || undefined,
      })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load facility")
      navigate("/facilities")
    } finally {
      setInitialLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const payload: CreateFacilityDto = {
        name: data.name,
        description: data.description || undefined,
        capacity: data.capacity || undefined,
      }

      if (id) {
        await updateFacility(Number(id), payload)
        toast.success("Facility updated successfully")
      } else {
        await createFacility(payload)
        toast.success("Facility created successfully")
      }

      navigate("/facilities")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save facility")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader text="Loading facility..." />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/facilities")}
        className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Facilities
      </button>

      <div className="bg-white border border-[hsl(var(--border))] rounded-xl p-8">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
          {id ? "Edit Facility" : "Add New Facility"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Facility Name *"
            placeholder="e.g., Conference Room A"
            error={errors.name?.message}
            {...register("name")}
          />

          <Textarea
            label="Description"
            placeholder="Provide a brief description of the facility..."
            error={errors.description?.message}
            {...register("description")}
          />

          <Input
            label="Capacity"
            type="number"
            placeholder="e.g., 50"
            error={errors.capacity?.message}
            {...register("capacity")}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => navigate("/facilities")} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} className="flex-1">
              {id ? "Update Facility" : "Create Facility"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FacilityForm

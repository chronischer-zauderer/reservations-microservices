import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Facilities from "../pages/Facilities"
import * as facilitiesApi from "../api/facilities"

// Mock the API module
vi.mock("../api/facilities")

const mockFacilities = [
  { id: 1, name: "Conference Room A", description: "Large room", capacity: 50 },
  { id: 2, name: "Meeting Room B", description: "Small room", capacity: 10 },
]

describe("FacilityList", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders loading state initially", () => {
    vi.mocked(facilitiesApi.getFacilities).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    )

    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>,
    )

    expect(screen.getByText(/Loading facilities/i)).toBeInTheDocument()
  })

  it("renders facilities after loading", async () => {
    vi.mocked(facilitiesApi.getFacilities).mockResolvedValue(mockFacilities)

    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText("Conference Room A")).toBeInTheDocument()
      expect(screen.getByText("Meeting Room B")).toBeInTheDocument()
    })
  })

  it("renders empty state when no facilities", async () => {
    vi.mocked(facilitiesApi.getFacilities).mockResolvedValue([])

    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/No facilities yet/i)).toBeInTheDocument()
    })
  })
})

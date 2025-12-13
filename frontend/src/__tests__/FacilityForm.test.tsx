import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import FacilityForm from "../views/FacilityForm"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({}),
  }
})

describe("FacilityForm", () => {
  it("renders form fields", () => {
    render(
      <BrowserRouter>
        <FacilityForm />
      </BrowserRouter>,
    )

    expect(screen.getByLabelText(/Facility Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument()
  })

  it("shows validation error when name is empty", async () => {
    render(
      <BrowserRouter>
        <FacilityForm />
      </BrowserRouter>,
    )

    const submitButton = screen.getByRole("button", { name: /Create Facility/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
    })
  })
})

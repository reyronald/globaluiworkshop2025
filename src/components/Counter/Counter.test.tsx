import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, it } from "vitest"

import { Counter } from "./Counter"

describe(Counter, () => {
  it("should increment, decrement and reset", async () => {
    render(<Counter />)

    screen.getByText("0")

    const incrementButton = screen.getByRole("button", { name: "Increment" })
    await userEvent.click(incrementButton)
    screen.getByText("1")
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    screen.getByText("3")

    const decrementButton = screen.getByRole("button", { name: "Decrement" })
    await userEvent.click(decrementButton)
    screen.getByText("2")

    await userEvent.click(screen.getByRole("button", { name: "Reset" }))
    screen.getByText("0")
  })
})

import { render as render_, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { act, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { createMemoryRouter, RouterProvider } from "react-router"
import { describe, it } from "vitest"

import { Counter } from "./Counter"

describe(Counter, () => {
  const server = setupServer()

  const render = (ui: React.ReactNode) => {
    return render_(
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: "*",
              element: (
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                  <Suspense fallback={<div>Loading...</div>}>{ui}</Suspense>
                </ErrorBoundary>
              ),
            },
          ],
          {
            initialEntries: ["/"],
          },
        )}
      />,
    )
  }

  it("should increment, decrement and reset", async () => {
    server.use(
      http.get(`https://pokeapi.co/api/v2/pokemon/ditto`, () => {
        return HttpResponse.json({ name: "Pikachu", weight: 60 })
      }),
    )

    await act(() => {
      render(<Counter />)
    })

    await screen.findByText("0")

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

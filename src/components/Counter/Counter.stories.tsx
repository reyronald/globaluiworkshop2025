import type { Meta, StoryObj } from "@storybook/react-vite"
import { Suspense, useEffect } from "react"
import { userEvent, within } from "@storybook/test"
import { ErrorBoundary } from "react-error-boundary"
import { delay, http, HttpResponse } from "msw"
import { createMemoryRouter, RouterProvider } from "react-router"

import { data } from "../../utils/data"
import { Counter } from "./Counter"

const meta = {
  title: "Example/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        http.get(`https://pokeapi.co/api/v2/pokemon/ditto`, () => {
          return HttpResponse.json({ name: "Pikachu", weight: 60 })
        }),
      ],
    },
    design: {
      name: "Figma designs",
      type: "figma",
      url: "https://www.figma.com/file/YourDesignFile",
    },
  },
  decorators: [
    (Story) => {
      return (
        <RouterProvider
          router={createMemoryRouter([{ path: "*", element: <Story /> }], {
            initialEntries: ["/"],
          })}
        />
      )
    },
  ],
  render: () => {
    useEffect(() => () => data.revalidate(), [])

    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Counter />
        </Suspense>
      </ErrorBoundary>
    )
  },
} satisfies Meta<typeof Counter>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {
  play: async (context) => {
    const canvas = within(context.canvasElement)

    await canvas.findByText("0")

    const incrementButton = canvas.getByRole("button", { name: "Increment" })
    await userEvent.click(incrementButton)
    canvas.getByText("1")
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    canvas.getByText("3")

    const decrementButton = canvas.getByRole("button", { name: "Decrement" })
    await userEvent.click(decrementButton)
    canvas.getByText("2")

    await userEvent.click(canvas.getByRole("button", { name: "Reset" }))
    canvas.getByText("0")

    await userEvent.click(decrementButton)
  },
} satisfies Story

export const Loading = {
  parameters: {
    msw: {
      handlers: [
        http.get(`https://pokeapi.co/api/v2/pokemon/ditto`, async () => {
          await delay("infinite")
        }),
      ],
    },
  },
} satisfies Story

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(`https://pokeapi.co/api/v2/pokemon/ditto`, async () => {
          return HttpResponse.json(
            { error: "Internal Server Error" },
            { status: 500, statusText: "Internal Server Error" },
          )
        }),
      ],
    },
  },
} satisfies Story

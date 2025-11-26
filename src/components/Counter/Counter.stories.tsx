import type { Meta, StoryObj } from "@storybook/react-vite"
import { userEvent, within } from "@storybook/test"

import { Counter } from "./Counter"

const meta = {
  title: "Example/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Counter>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {
  play: async (context) => {
    const canvas = within(context.canvasElement)

    canvas.getByText("0")

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

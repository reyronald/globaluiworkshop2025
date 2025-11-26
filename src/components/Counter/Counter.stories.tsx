import type { Meta, StoryObj } from "@storybook/react-vite"

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

export const Default = {} satisfies Story

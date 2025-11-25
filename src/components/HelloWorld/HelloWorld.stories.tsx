import type { Meta, StoryObj } from "@storybook/react-vite";

import { HelloWorld } from "./HelloWorld";

const meta = {
  title: "Example/HelloWorld",
  component: HelloWorld,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HelloWorld>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

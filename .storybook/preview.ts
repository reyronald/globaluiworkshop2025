import type { Preview } from "@storybook/react-vite"

import { initialize as initializeMSW, mswLoader } from "msw-storybook-addon"

import "../src/tailwind.css"
import "../src/index.css"

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initializeMSW({
  quiet: import.meta.env.MODE === "test",
  onUnhandledRequest: (request, print) => {
    if (
      [".css", ".json", ".ts", ".tsx", ".svg", "?import"].some((path) => request.url.includes(path))
    ) {
      return
    }

    print.warning()
  },
})

const preview: Preview = {
  loaders: [mswLoader],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview

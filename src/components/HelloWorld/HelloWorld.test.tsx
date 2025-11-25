import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { HelloWorld } from "./HelloWorld"

describe(HelloWorld, () => {
  it("renders", () => {
    render(<HelloWorld />)

    screen.getByText("Hello, World!")
  })
})

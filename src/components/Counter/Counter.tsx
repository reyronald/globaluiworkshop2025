import { useState } from "react"

export function Counter() {
  const [value, setValue] = useState(0)

  const handleIncrement = () => setValue((prev) => prev + 1)
  const handleDecrement = () => setValue((prev) => prev - 1)
  const handleReset = () => setValue(0)

  return (
    <div className="space-x-3">
      <button type="button" onClick={handleDecrement} aria-label="Decrement">
        -
      </button>

      <span aria-live="polite" aria-atomic="true">
        {value}
      </span>

      <button type="button" onClick={handleIncrement} aria-label="Increment">
        +
      </button>

      <button type="button" onClick={handleReset} aria-label="Reset">
        reset
      </button>
    </div>
  )
}

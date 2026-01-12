import { use, useState } from "react"
import { Link } from "react-router"
import { data } from "../../utils/data"

export function Counter() {
  const [value, setValue] = useState(0)

  const handleIncrement = () => setValue((prev) => prev + 1)
  const handleDecrement = () => setValue((prev) => prev - 1)
  const handleReset = () => setValue(0)

  const pokemon = use(data.getPokemon())

  return (
    <div className="space-y-3 text-center">
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

      <p>
        Your Pokemon is <span className="font-bold">{pokemon.name}</span> (weight: {pokemon.weight})
      </p>

      <p>
        <Link to="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </p>
    </div>
  )
}

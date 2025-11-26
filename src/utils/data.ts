const promisesCache = new Map<string, Promise<Pokemon>>()

type Pokemon = {
  name: string
  weight: number
}

const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  const data: Pokemon = await response.json()
  return data
}

export function revalidate() {
  promisesCache.clear()
}

export function getPokemon() {
  const key = "root"
  if (promisesCache.has(key)) {
    return promisesCache.get(key)!
  }
  const promise = fetchPokemon()
  promisesCache.set(key, promise)
  return promise
}

export const data = {
  getPokemon,
  revalidate,
}

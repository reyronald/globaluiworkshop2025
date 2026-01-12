import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { ErrorBoundary } from "react-error-boundary"

import App from "./App.tsx"

import "./tailwind.css"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)

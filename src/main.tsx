import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "./App.tsx";

createRoot(document.getElementById('app-qr-authz')!).render(
  <StrictMode>
      <App/>
  </StrictMode>,
)

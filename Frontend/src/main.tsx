import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import '../src/styles/style.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
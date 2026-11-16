import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Home from './pages/Home.jsx'
import './styles/global.css'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <Home />
  </StrictMode>,
)

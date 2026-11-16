import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Obrigado from './pages/Obrigado.jsx'
import './styles/global.css'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <Obrigado />
  </StrictMode>,
)

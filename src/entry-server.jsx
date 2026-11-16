import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import Home from './pages/Home.jsx'
import Obrigado from './pages/Obrigado.jsx'

const render = (Page) =>
  renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  )

export const pages = {
  'index.html': () => render(Home),
  'obrigado/index.html': () => render(Obrigado),
}

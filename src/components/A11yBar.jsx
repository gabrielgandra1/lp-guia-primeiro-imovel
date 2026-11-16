import { useEffect, useState } from 'react'
import { Accessibility, Contrast } from 'lucide-react'
import { loadVLibrasOnInteraction } from '../lib/vlibras.js'

const STORAGE_KEY = 'lc-a11y'
const SIZES = ['100%', '112,5%', '125%', '137,5%']
const DEFAULT_PREFS = { fonte: 0, contraste: false }

function readPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!saved) return DEFAULT_PREFS
    return {
      fonte: Math.min(SIZES.length - 1, Math.max(0, Number(saved.fonte) || 0)),
      contraste: saved.contraste === true,
    }
  } catch (error) {
    return DEFAULT_PREFS
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    return true
  } catch (error) {
    return false
  }
}

export default function A11yBar() {
  const [prefs, setPrefs] = useState(null)
  const [message, setMessage] = useState('')
  const current = prefs ?? DEFAULT_PREFS

  useEffect(() => {
    setPrefs(readPrefs())
    return loadVLibrasOnInteraction()
  }, [])

  useEffect(() => {
    if (!prefs) return
    const root = document.documentElement
    if (prefs.fonte > 0) root.setAttribute('data-fonte', String(prefs.fonte))
    else root.removeAttribute('data-fonte')
    if (prefs.contraste) root.setAttribute('data-contraste', 'alto')
    else root.removeAttribute('data-contraste')
    savePrefs(prefs)
  }, [prefs])

  const changeSize = (step) => {
    const next = Math.min(SIZES.length - 1, Math.max(0, current.fonte + step))
    if (next === current.fonte) {
      setMessage(step > 0 ? `O texto já está no tamanho máximo, ${SIZES[next]}.` : `O texto já está no tamanho padrão, ${SIZES[next]}.`)
      return
    }
    setPrefs({ ...current, fonte: next })
    setMessage(`Tamanho do texto: ${SIZES[next]}.`)
  }

  const toggleContrast = () => {
    setPrefs({ ...current, contraste: !current.contraste })
    setMessage(current.contraste ? 'Alto contraste desativado.' : 'Alto contraste ativado.')
  }

  return (
    <div className="a11y-bar" role="region" aria-label="Recursos de acessibilidade">
      <div className="container a11y-bar__inner">
        <p className="a11y-bar__title" id="a11y-titulo">
          <Accessibility className="icon" aria-hidden="true" focusable="false" />
          Acessibilidade
        </p>
        <div className="a11y-bar__actions" role="group" aria-labelledby="a11y-titulo">
          <button className="a11y-btn" type="button" onClick={() => changeSize(-1)}>
            A−<span className="sr-only"> Diminuir o texto</span>
          </button>
          <button className="a11y-btn" type="button" onClick={() => changeSize(1)}>
            A+<span className="sr-only"> Aumentar o texto</span>
          </button>
          <button className="a11y-btn" type="button" aria-pressed={current.contraste} onClick={toggleContrast}>
            <Contrast className="icon" aria-hidden="true" focusable="false" />
            <span className="a11y-btn__label">Alto contraste</span>
          </button>
        </div>
        <p className="sr-only" role="status">{message}</p>
      </div>
    </div>
  )
}

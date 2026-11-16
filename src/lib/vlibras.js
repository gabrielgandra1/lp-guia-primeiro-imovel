const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel']

export function loadVLibrasOnInteraction() {
  let requested = false

  const load = () => {
    if (requested) return
    requested = true
    EVENTS.forEach((name) => window.removeEventListener(name, load))
    const widget = document.createElement('div')
    widget.setAttribute('vw', '')
    widget.className = 'enabled'
    widget.innerHTML = '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>'
    document.body.appendChild(widget)
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.addEventListener('load', () => {
      if (!window.VLibras) return
      new window.VLibras.Widget('https://vlibras.gov.br/app')
      if (document.readyState === 'complete' && typeof window.onload === 'function') window.onload()
    })
    document.body.appendChild(script)
  }

  EVENTS.forEach((name) => window.addEventListener(name, load, { passive: true }))
  return () => EVENTS.forEach((name) => window.removeEventListener(name, load))
}

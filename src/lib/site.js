export const BASE_URL = import.meta.env.BASE_URL

export const WHATSAPP_URL = `https://wa.me/5548900000000?text=${encodeURIComponent('Olá! Baixei o Guia do Primeiro Imóvel e quero conversar com um corretor.')}`

export const PDF_URL = `${BASE_URL}guia-primeiro-imovel.pdf`

export const THANK_YOU_URL = `${BASE_URL}obrigado/`

export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || ''

export const REPO_URL = 'https://github.com/gabrielgandra1/lp-guia-primeiro-imovel'

const NAME_KEY = 'lc-nome'

export function rememberFirstName(fullName) {
  try {
    sessionStorage.setItem(NAME_KEY, fullName.trim().split(/\s+/)[0].slice(0, 30))
    return true
  } catch (error) {
    return false
  }
}

export function readFirstName() {
  try {
    return sessionStorage.getItem(NAME_KEY) || ''
  } catch (error) {
    return ''
  }
}

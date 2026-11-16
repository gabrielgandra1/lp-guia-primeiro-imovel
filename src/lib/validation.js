const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const onlyDigits = (value) => String(value ?? '').replace(/\D/g, '')

export function maskPhone(value) {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length < 3) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length < 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function validateLead({ nome = '', email = '', whatsapp = '', consentimento = false }) {
  const errors = {}
  const name = nome.trim()
  const mail = email.trim()
  const phone = onlyDigits(whatsapp)

  if (!name) errors.nome = 'Informe seu nome.'
  else if (name.length < 2) errors.nome = 'O nome precisa ter pelo menos 2 letras.'

  if (!mail) errors.email = 'Informe seu e-mail.'
  else if (!EMAIL_PATTERN.test(mail)) errors.email = 'Digite um e-mail válido, como nome@exemplo.com.'

  if (phone && (phone.length < 10 || phone.length > 11)) {
    errors.whatsapp = 'Digite o número com DDD, como (48) 90000-0000.'
  } else if (phone.length === 11 && phone[2] !== '9') {
    errors.whatsapp = 'Celular com 11 dígitos começa com 9 depois do DDD.'
  }

  if (!consentimento) errors.consentimento = 'Para receber o guia, marque que você concorda com o aviso de privacidade.'

  return errors
}

export const FIELD_ORDER = ['nome', 'email', 'whatsapp', 'consentimento']

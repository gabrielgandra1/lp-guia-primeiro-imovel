import { describe, expect, it } from 'vitest'
import { maskPhone, onlyDigits, validateLead } from './validation.js'

describe('maskPhone', () => {
  it('formata celular com 11 dígitos', () => {
    expect(maskPhone('48900000000')).toBe('(48) 90000-0000')
  })

  it('formata fixo com 10 dígitos', () => {
    expect(maskPhone('4833334444')).toBe('(48) 3333-4444')
  })

  it('formata enquanto a pessoa digita', () => {
    expect(maskPhone('4')).toBe('(4')
    expect(maskPhone('489')).toBe('(48) 9')
    expect(maskPhone('4890000')).toBe('(48) 9000-0')
  })

  it('ignora letras e limita a 11 dígitos', () => {
    expect(maskPhone('(48) 9a0000-00009999')).toBe('(48) 90000-0000')
    expect(maskPhone('')).toBe('')
  })
})

describe('onlyDigits', () => {
  it('remove tudo que não é número', () => {
    expect(onlyDigits('(48) 90000-0000')).toBe('48900000000')
    expect(onlyDigits(undefined)).toBe('')
  })
})

describe('validateLead', () => {
  const valid = { nome: 'Ana Souza', email: 'ana@exemplo.com', whatsapp: '', consentimento: true }

  it('aceita dados válidos com WhatsApp vazio', () => {
    expect(validateLead(valid)).toEqual({})
  })

  it('aceita WhatsApp completo', () => {
    expect(validateLead({ ...valid, whatsapp: '(48) 90000-0000' })).toEqual({})
  })

  it('exige nome e e-mail', () => {
    const errors = validateLead({ ...valid, nome: '  ', email: '' })
    expect(errors.nome).toBe('Informe seu nome.')
    expect(errors.email).toBe('Informe seu e-mail.')
  })

  it('recusa e-mail sem domínio válido', () => {
    expect(validateLead({ ...valid, email: 'ana@exemplo' }).email).toMatch(/e-mail válido/)
    expect(validateLead({ ...valid, email: 'ana exemplo.com' }).email).toMatch(/e-mail válido/)
  })

  it('recusa WhatsApp incompleto', () => {
    expect(validateLead({ ...valid, whatsapp: '(48) 9000' }).whatsapp).toMatch(/DDD/)
  })

  it('recusa celular de 11 dígitos sem o 9', () => {
    expect(validateLead({ ...valid, whatsapp: '(48) 80000-0000' }).whatsapp).toMatch(/começa com 9/)
  })

  it('exige o consentimento da LGPD', () => {
    expect(validateLead({ ...valid, consentimento: false }).consentimento).toMatch(/aviso de privacidade/)
  })
})

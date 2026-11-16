import { useId, useRef, useState } from 'react'
import { ArrowRight, CircleAlert, LoaderCircle, Lock } from 'lucide-react'
import { FIELD_ORDER, maskPhone, validateLead } from '../lib/validation.js'
import { FORMSPREE_ID, THANK_YOU_URL, rememberFirstName } from '../lib/site.js'

const EMPTY = { nome: '', email: '', whatsapp: '', consentimento: false }

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p className="field__error" id={id}>
      <CircleAlert className="icon" aria-hidden="true" focusable="false" />
      {message}
    </p>
  )
}

export default function LeadForm({ title, description, headingLevel = 2 }) {
  const uid = useId()
  const ids = {
    titulo: `${uid}-titulo`,
    nome: `${uid}-nome`,
    email: `${uid}-email`,
    whatsapp: `${uid}-whatsapp`,
    whatsappDica: `${uid}-whatsapp-dica`,
    consentimento: `${uid}-consentimento`,
  }
  const refs = {
    nome: useRef(null),
    email: useRef(null),
    whatsapp: useRef(null),
    consentimento: useRef(null),
  }
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const Heading = `h${headingLevel}`

  const visibleError = (field) => (touched[field] ? errors[field] : undefined)
  const describedBy = (field, ...extra) => {
    const list = [...extra]
    if (visibleError(field)) list.push(`${ids[field]}-erro`)
    return list.length ? list.join(' ') : undefined
  }

  const change = (field, value) => {
    const next = { ...values, [field]: field === 'whatsapp' ? maskPhone(value) : value }
    setValues(next)
    if (touched[field]) setErrors(validateLead(next))
  }

  const blur = (field) => {
    if (field !== 'consentimento' && !values[field] && !touched[field]) return
    setTouched((previous) => ({ ...previous, [field]: true }))
    setErrors(validateLead(values))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
    const found = validateLead(values)
    setErrors(found)
    setTouched({ nome: true, email: true, whatsapp: true, consentimento: true })
    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      refs[firstInvalid].current?.focus()
      return
    }
    setStatus('sending')
    try {
      if (FORMSPREE_ID) {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: values.nome.trim(),
            email: values.email.trim(),
            whatsapp: values.whatsapp,
            consentimento_lgpd: 'sim',
          }),
        })
        if (!response.ok) throw new Error(`Formspree respondeu ${response.status}`)
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700))
      }
      rememberFirstName(values.nome)
      window.location.assign(THANK_YOU_URL)
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form className="lead-form" noValidate onSubmit={submit} aria-labelledby={ids.titulo}>
      <Heading className="lead-form__title" id={ids.titulo}>{title}</Heading>
      {description && <p className="lead-form__description">{description}</p>}
      <p className="lead-form__required">Campos com <span aria-hidden="true">*</span> são obrigatórios.</p>

      <div className="field">
        <label htmlFor={ids.nome}>
          Nome <span className="field__required" aria-hidden="true">*</span>
        </label>
        <input
          ref={refs.nome}
          id={ids.nome}
          name="nome"
          type="text"
          autoComplete="name"
          required
          aria-invalid={visibleError('nome') ? 'true' : undefined}
          aria-describedby={describedBy('nome')}
          value={values.nome}
          onChange={(event) => change('nome', event.target.value)}
          onBlur={() => blur('nome')}
        />
        <FieldError id={`${ids.nome}-erro`} message={visibleError('nome')} />
      </div>

      <div className="field">
        <label htmlFor={ids.email}>
          E-mail <span className="field__required" aria-hidden="true">*</span>
        </label>
        <input
          ref={refs.email}
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck="false"
          required
          aria-invalid={visibleError('email') ? 'true' : undefined}
          aria-describedby={describedBy('email')}
          value={values.email}
          onChange={(event) => change('email', event.target.value)}
          onBlur={() => blur('email')}
        />
        <FieldError id={`${ids.email}-erro`} message={visibleError('email')} />
      </div>

      <div className="field">
        <label htmlFor={ids.whatsapp}>
          WhatsApp <span className="field__optional">(opcional)</span>
        </label>
        <input
          ref={refs.whatsapp}
          id={ids.whatsapp}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(48) 90000-0000"
          aria-invalid={visibleError('whatsapp') ? 'true' : undefined}
          aria-describedby={describedBy('whatsapp', ids.whatsappDica)}
          value={values.whatsapp}
          onChange={(event) => change('whatsapp', event.target.value)}
          onBlur={() => blur('whatsapp')}
        />
        <p className="field__hint" id={ids.whatsappDica}>Com DDD. Usamos só para enviar o guia por lá também.</p>
        <FieldError id={`${ids.whatsapp}-erro`} message={visibleError('whatsapp')} />
      </div>

      <div className="field field--check">
        <div className="check">
          <input
            ref={refs.consentimento}
            id={ids.consentimento}
            name="consentimento"
            type="checkbox"
            required
            aria-invalid={visibleError('consentimento') ? 'true' : undefined}
            aria-describedby={describedBy('consentimento')}
            checked={values.consentimento}
            onChange={(event) => change('consentimento', event.target.checked)}
            onBlur={() => blur('consentimento')}
          />
          <label htmlFor={ids.consentimento}>
            Concordo em receber o guia e conteúdos da Lar Certo, conforme o{' '}
            <a href="#privacidade">aviso de privacidade</a>.{' '}
            <span className="field__required" aria-hidden="true">*</span>
          </label>
        </div>
        <FieldError id={`${ids.consentimento}-erro`} message={visibleError('consentimento')} />
      </div>

      <button className="btn btn--accent btn--lg btn--block" type="submit" aria-disabled={status === 'sending' ? 'true' : undefined}>
        {status === 'sending' ? (
          <>
            <LoaderCircle className="icon icon--spin" aria-hidden="true" focusable="false" />
            Enviando…
          </>
        ) : (
          <>
            Quero o guia grátis
            <ArrowRight className="icon" aria-hidden="true" focusable="false" />
          </>
        )}
      </button>

      <p className="lead-form__safe">
        <Lock className="icon" aria-hidden="true" focusable="false" />
        Seus dados estão seguros. Não enviamos spam.
      </p>

      <p className="sr-only" role="status">{status === 'sending' ? 'Enviando seus dados.' : ''}</p>
      {status === 'error' && (
        <p className="form-alert" role="alert">
          Não foi possível enviar agora. Verifique sua conexão e tente de novo.
        </p>
      )}
    </form>
  )
}

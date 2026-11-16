import { BASE_URL } from '../lib/site.js'

function Mark() {
  return (
    <svg className="brand__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect className="brand__bg" width="40" height="40" rx="11" />
      <path className="brand__house" d="M10 20.5 20 11.5l10 9M13.5 18v10.5h13V18" />
      <rect className="brand__door" x="17.75" y="22" width="4.5" height="6.5" rx="1" />
    </svg>
  )
}

export default function Brand({ link = false, light = false }) {
  const className = `brand${light ? ' brand--light' : ''}`
  const content = (
    <>
      <Mark />
      <span className="brand__name">
        Lar Certo <span className="brand__sub">Imóveis</span>
      </span>
    </>
  )
  if (link) {
    return (
      <a className={className} href={BASE_URL} aria-label="Lar Certo Imóveis, voltar à página do guia">
        {content}
      </a>
    )
  }
  return <p className={className}>{content}</p>
}

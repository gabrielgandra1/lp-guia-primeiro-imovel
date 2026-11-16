export default function EbookCover({ size = 'lg' }) {
  return (
    <div className={`ebook ebook--${size}`} role="img" aria-label="Capa do e-book Guia do Primeiro Imóvel, da Lar Certo Imóveis">
      <div className="ebook__book" aria-hidden="true">
        <div className="ebook__spine" />
        <div className="ebook__front">
          <span className="ebook__tag">E-book gratuito</span>
          <span className="ebook__title">Guia do Primeiro Imóvel</span>
          <span className="ebook__subtitle">Do aluguel às chaves, passo a passo</span>
          <svg className="ebook__art" viewBox="0 0 120 92" focusable="false">
            <circle cx="60" cy="50" r="40" fill="#FFFFFF" fillOpacity=".08" />
            <path d="M36 47v33h48V47" fill="#FFFFFF" />
            <path d="M27 51 60 23l33 28" fill="none" stroke="#F97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="54" y="60" width="12" height="20" rx="2" fill="#1E3A8A" />
            <rect x="41" y="56" width="9" height="9" rx="1.5" fill="#BFDBFE" />
            <rect x="70" y="56" width="9" height="9" rx="1.5" fill="#BFDBFE" />
            <circle cx="98" cy="74" r="7" fill="none" stroke="#FACC15" strokeWidth="3.5" />
            <path d="M93 78.5 82 89.5m4-4 3 3m-6 0 2 2" fill="none" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <span className="ebook__brand">Lar Certo Imóveis</span>
        </div>
      </div>
    </div>
  )
}

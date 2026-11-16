import { useEffect, useState } from 'react'
import { Download, MailCheck } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import EbookCover from '../components/EbookCover.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { PDF_URL, WHATSAPP_URL, readFirstName } from '../lib/site.js'

export default function Obrigado() {
  const [nome, setNome] = useState('')

  useEffect(() => {
    setNome(readFirstName())
  }, [])

  return (
    <Layout homeLink>
      <section className="thanks" aria-labelledby="obrigado-titulo">
        <div className="container thanks__grid">
          <div className="thanks__card">
            <span className="thanks__icon">
              <MailCheck className="icon" aria-hidden="true" focusable="false" />
            </span>
            <h1 id="obrigado-titulo">{nome ? `Pronto, ${nome}! Seu guia está a caminho.` : 'Pronto! Seu guia está a caminho.'}</h1>
            <p className="thanks__lead">
              Enviamos o link para o seu e-mail. Se não encontrar, confira as pastas de spam e de promoções. Se preferir,
              baixe agora:
            </p>
            <a className="btn btn--accent btn--lg" href={PDF_URL} download>
              <Download className="icon" aria-hidden="true" focusable="false" />
              Baixar o guia em PDF
              <span className="sr-only"> (arquivo PDF)</span>
            </a>
            <div className="thanks__divider" />
            <h2>Quer ajuda para encontrar seu imóvel?</h2>
            <p>Converse com um corretor da Lar Certo pelo WhatsApp. A simulação de financiamento é por nossa conta.</p>
            <a className="btn btn--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener">
              <WhatsAppIcon />
              Falar com um corretor
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
          </div>
          <div className="thanks__cover">
            <EbookCover />
          </div>
        </div>
      </section>
    </Layout>
  )
}

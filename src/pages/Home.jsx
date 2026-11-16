import { BookOpen, Calculator, CircleCheckBig, FileCheck2, Landmark, PiggyBank, Quote, TriangleAlert, Users } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import LeadForm from '../components/LeadForm.jsx'
import EbookCover from '../components/EbookCover.jsx'

const BENEFITS = [
  { title: 'Quanto juntar', text: 'de entrada e para os custos da compra, sem surpresas.' },
  { title: 'Como usar o FGTS', text: 'na entrada ou nas parcelas, e quem tem direito.' },
  { title: 'Qual parcela cabe', text: 'no seu bolso, com simulação antes de visitar imóveis.' },
]

const CHAPTERS = [
  { icon: PiggyBank, title: 'Quanto juntar de entrada', text: 'Quanto guardar e quais custos extras entram na conta, como ITBI, cartório e avaliação do banco.' },
  { icon: Landmark, title: 'Como usar o FGTS', text: 'Quem pode usar, em quais situações e como o saldo ajuda na entrada ou nas parcelas.' },
  { icon: Calculator, title: 'Simulação de financiamento', text: 'SAC ou Price, o custo efetivo total (CET) e quanto da renda a parcela pode comprometer.' },
  { icon: FileCheck2, title: 'Documentos', text: 'A lista do que separar para você, para o vendedor e para o imóvel, sem idas e vindas ao banco.' },
  { icon: TriangleAlert, title: 'Erros comuns', text: 'Os deslizes que mais atrasam a compra e como evitar cada um deles.' },
]

const TESTIMONIALS = [
  {
    quote: 'A gente achava que nunca ia conseguir a entrada. Com o guia, montamos um plano e em oito meses assinamos o contrato.',
    name: 'Mariana e Diego',
    place: 'São José/SC',
    initials: 'MD',
  },
  {
    quote: 'A parte do FGTS me poupou uma ida ao banco. Explicação simples e direto ao ponto.',
    name: 'Rafael T.',
    place: 'Palhoça/SC',
    initials: 'RT',
  },
]

export default function Home() {
  return (
    <Layout>
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="container hero__grid">
          <div className="hero__intro">
            <p className="eyebrow">
              <BookOpen className="icon" aria-hidden="true" focusable="false" />
              E-book gratuito
            </p>
            <h1 id="hero-titulo">Pare de pagar aluguel: o passo a passo para comprar seu primeiro imóvel</h1>
            <p className="hero__lead">Baixe grátis o guia que explica entrada, FGTS e financiamento sem complicação.</p>
          </div>
          <ul className="benefits" role="list" aria-label="O que você aprende no guia">
            {BENEFITS.map((item) => (
              <li key={item.title}>
                <CircleCheckBig className="icon" aria-hidden="true" focusable="false" />
                <span>
                  <strong>{item.title}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="hero__form">
            <LeadForm title="Receba o guia grátis" description="Leva menos de um minuto. O PDF chega no seu e-mail." />
          </div>
          <div className="hero__cover">
            <EbookCover />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="capitulos-titulo">
        <div className="container">
          <header className="section__header">
            <p className="eyebrow eyebrow--center">O que tem no guia</p>
            <h2 id="capitulos-titulo">5 capítulos curtos, do primeiro passo à assinatura</h2>
            <p>Linguagem simples, exemplos com números e listas para você seguir sem depender de ninguém.</p>
          </header>
          <ol className="chapters" role="list">
            {CHAPTERS.map(({ icon: Icon, title, text }, index) => (
              <li className="chapter" key={title}>
                <span className="chapter__icon">
                  <Icon className="icon" aria-hidden="true" focusable="false" />
                </span>
                <h3>
                  <span className="chapter__label">Capítulo {index + 1}</span>
                  {title}
                </h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="quem-titulo">
        <div className="container about">
          <div className="about__art" aria-hidden="true">
            <svg viewBox="0 0 320 240" focusable="false">
              <rect x="8" y="20" width="304" height="200" rx="28" fill="#E0E7FF" />
              <path d="M92 116v84h136v-84" fill="#FFFFFF" />
              <path d="M70 124 160 52l90 72" fill="none" stroke="#1E3A8A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="144" y="146" width="32" height="54" rx="4" fill="#F97316" />
              <rect x="108" y="136" width="24" height="24" rx="4" fill="#BFDBFE" />
              <rect x="188" y="136" width="24" height="24" rx="4" fill="#BFDBFE" />
              <circle cx="254" cy="74" r="16" fill="none" stroke="#1E3A8A" strokeWidth="7" />
              <path d="M242 86 214 114m9-9 8 8m-16 0 6 6" fill="none" stroke="#1E3A8A" strokeWidth="7" strokeLinecap="round" />
              <circle cx="56" cy="62" r="6" fill="#F97316" />
              <circle cx="278" cy="176" r="8" fill="#1E3A8A" fillOpacity=".25" />
            </svg>
          </div>
          <div className="about__text">
            <p className="eyebrow">Quem preparou</p>
            <h2 id="quem-titulo">Lar Certo Imóveis, há mais de 10 anos na Grande Florianópolis</h2>
            <p>
              Somos uma imobiliária que ajuda famílias a sair do aluguel com segurança. Reunimos neste guia as dúvidas que
              mais ouvimos de quem está comprando o primeiro imóvel.
            </p>
            <p className="about__creci">CRECI-SC 0000-J</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="prova-titulo">
        <div className="container">
          <header className="section__header">
            <p className="eyebrow eyebrow--center">Quem já baixou</p>
            <h2 id="prova-titulo">Mais de 2.000 downloads e muitas chaves entregues</h2>
          </header>
          <div className="proof">
            <p className="stat">
              <Users className="icon" aria-hidden="true" focusable="false" />
              <span className="stat__number">+2.000</span>
              <span className="stat__label">downloads do guia</span>
            </p>
            <ul className="testimonials" role="list">
              {TESTIMONIALS.map((item) => (
                <li key={item.name}>
                  <figure className="testimonial">
                    <Quote className="icon testimonial__icon" aria-hidden="true" focusable="false" />
                    <blockquote>
                      <p>{item.quote}</p>
                    </blockquote>
                    <figcaption>
                      <span className="avatar" aria-hidden="true">{item.initials}</span>
                      <span>
                        <strong>{item.name}</strong>
                        <span className="testimonial__place">{item.place}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--cta" aria-label="Formulário final para receber o guia">
        <div className="container cta">
          <div className="cta__text">
            <h2>Pronto para dar o primeiro passo?</h2>
            <p>Comprar o primeiro imóvel dá trabalho, mas não precisa ser complicado. Comece pelo guia.</p>
            <EbookCover size="sm" />
          </div>
          <LeadForm title="Quero receber o guia" description="Preencha e baixe agora mesmo, sem custo." />
        </div>
      </section>
    </Layout>
  )
}

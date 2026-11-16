import Brand from './Brand.jsx'
import { REPO_URL } from '../lib/site.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Brand light />
            <p className="footer__about">Imobiliária da Grande Florianópolis que ajuda famílias a sair do aluguel com segurança.</p>
          </div>
          <section className="privacy" id="privacidade" aria-labelledby="privacidade-titulo" tabIndex={-1}>
            <h2 id="privacidade-titulo">Aviso de privacidade</h2>
            <p>
              Seguimos a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). Usamos seu nome, e-mail e WhatsApp
              apenas para enviar o guia e conteúdos sobre compra de imóveis. Não vendemos nem compartilhamos seus dados com
              terceiros. Você pode pedir acesso, correção ou exclusão quando quiser, respondendo a qualquer e-mail nosso.
            </p>
          </section>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Lar Certo Imóveis · CRECI-SC 0000-J · Grande Florianópolis/SC</p>
          <p>
            <strong>Projeto conceitual:</strong> empresa, pessoas, números e depoimentos são fictícios, criados para
            portfólio. <a href={REPO_URL}>Ver o código no GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

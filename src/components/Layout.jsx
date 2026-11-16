import A11yBar from './A11yBar.jsx'
import Brand from './Brand.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children, homeLink = false }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <A11yBar />
      <header className="site-header">
        <div className="container header__inner">
          <Brand link={homeLink} />
        </div>
      </header>
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}

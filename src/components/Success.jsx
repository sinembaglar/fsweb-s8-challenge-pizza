import { Link } from 'react-router-dom'
import logo from '../../images/iteration-1-images/logo.svg'
import './Success.css'

export default function Success() {
  return (
    <div className="success">
      <header>
        <Link to="/" aria-label="Anasayfaya dön">
          <img src={logo} alt="Teknolojik Yemekler" className="success-logo" />
        </Link>
      </header>

      <main className="success-message">
        <h1>
          TEBRİKLER!
          <br />
          SİPARİŞİNİZ ALINDI!
        </h1>
      </main>
    </div>
  )
}

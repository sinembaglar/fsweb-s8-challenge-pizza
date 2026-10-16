import { Link } from 'react-router-dom'
import logo from '../../images/iteration-1-images/logo.svg'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <header>
        <img src={logo} alt="Teknolojik Yemekler" className="home-logo" />
      </header>

      <section className="hero">
        <h1>
          KOD ACIKTIRIR
          <br />
          PİZZA, DOYURUR
        </h1>
        <Link to="/siparis" className="hero-button">
          ACIKTIM
        </Link>
      </section>
    </main>
  )
}

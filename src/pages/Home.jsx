import { Link } from 'react-router-dom'
import Header from '../components/Header'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Header transparent />
      <main className="hero">
        <h1 className="hero__title">
          KOD ACIKTIRIR
          <br />
          PİZZA, DOYURUR
        </h1>
        <Link to="/siparis" className="hero__cta" data-cy="order-cta">
          ACIKTIM
        </Link>
      </main>
    </div>
  )
}

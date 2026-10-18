import { Link } from 'react-router-dom'
import logo from '../../images/iteration-1-images/logo.svg'
import CategoryNav from './CategoryNav'
import PromoCards from './PromoCards'
import PopularMenus from './PopularMenus'
import Footer from './Footer'
import './Home.css'

export default function Home() {
  return (
    <>
      <header className="hero">
        <img src={logo} alt="Teknolojik Yemekler" className="home-logo" />
        <p className="hero-tagline">fırsatı kaçırma</p>
        <h1>
          KOD ACIKTIRIR
          <br />
          PİZZA, DOYURUR
        </h1>
        <Link to="/siparis" className="hero-button">
          ACIKTIM
        </Link>
      </header>

      <main>
        <CategoryNav />
        <div className="home-content">
          <PromoCards />
          <PopularMenus />
        </div>
      </main>

      <Footer />
    </>
  )
}

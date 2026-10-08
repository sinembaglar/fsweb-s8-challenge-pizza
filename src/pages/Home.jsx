import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoryNav from '../components/home/CategoryNav'
import PromoCards from '../components/home/PromoCards'
import MenuSection from '../components/home/MenuSection'
import { CATEGORIES, PRODUCTS } from '../data/home'
import './Home.css'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null)
  const menuRef = useRef(null)

  const handleNavSelect = (categoryId) => {
    setActiveCategory(categoryId)
    menuRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="home">
        <Header transparent />
        <section className="hero" aria-labelledby="hero-title">
          <p className="hero__tagline">fırsatı kaçırma</p>
          <h1 id="hero-title" className="hero__title">
            KOD ACIKTIRIR
            <br />
            PİZZA, DOYURUR
          </h1>
          <Link to="/siparis" className="hero__cta" data-cy="order-cta">
            ACIKTIM
          </Link>
        </section>
      </div>

      <CategoryNav categories={CATEGORIES} onSelect={handleNavSelect} />

      <main className="home-content">
        <PromoCards />
        <MenuSection
          ref={menuRef}
          categories={CATEGORIES}
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </main>

      <Footer />
    </>
  )
}

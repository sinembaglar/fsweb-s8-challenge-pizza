import { Link } from 'react-router-dom'

export default function PromoCards() {
  return (
    <section className="promos" aria-label="Kampanyalar">
      <article className="promo promo--large">
        <h2 className="promo__title promo__title--serif">
          Özel
          <br />
          Lezzetus
        </h2>
        <p className="promo__subtitle">Position:Absolute Acı Burger</p>
        <Link to="/siparis" className="promo__cta" data-cy="promo-cta">
          SİPARİŞ VER
        </Link>
      </article>

      <article className="promo promo--dark">
        <h2 className="promo__title">
          Hackathlon
          <br />
          Burger Menü
        </h2>
        <Link to="/siparis" className="promo__cta">
          SİPARİŞ VER
        </Link>
      </article>

      <article className="promo promo--light">
        <h2 className="promo__title">
          <span className="promo__highlight">Çoooook</span> hızlı
          <br />
          npm gibi kurye
        </h2>
        <Link to="/siparis" className="promo__cta">
          SİPARİŞ VER
        </Link>
      </article>
    </section>
  )
}

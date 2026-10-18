import { Link } from 'react-router-dom'

export default function PromoCards() {
  return (
    <section className="promo-cards" aria-label="Kampanyalar">
      <article className="promo-card promo-card--large">
        <h2 className="promo-title-serif">Özel Lezzetus</h2>
        <p>Position:Absolute Acı Burger</p>
        <Link to="/siparis" className="promo-button">
          SİPARİŞ VER
        </Link>
      </article>

      <article className="promo-card promo-card--dark">
        <h2>
          Hackathlon
          <br />
          Burger Menü
        </h2>
        <Link to="/siparis" className="promo-button">
          SİPARİŞ VER
        </Link>
      </article>

      <article className="promo-card promo-card--light">
        <h2>
          <span className="text-red">Çoooook</span> hızlı
          <br />
          npm gibi kurye
        </h2>
        <Link to="/siparis" className="promo-button">
          SİPARİŞ VER
        </Link>
      </article>
    </section>
  )
}

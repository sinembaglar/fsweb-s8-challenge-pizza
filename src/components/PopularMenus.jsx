import { useState } from 'react'
import { kategoriler, urunler } from '../data/menu'
import ProductCard from './ProductCard'

export default function PopularMenus() {
  const [aktifKategori, setAktifKategori] = useState('pizza')

  return (
    <section className="popular-menus" aria-labelledby="populer-baslik">
      <p className="section-tagline">en çok paketlenen menüler</p>
      <h2 id="populer-baslik">Acıktıran Kodlara Doyuran Lezzetler</h2>

      <div className="category-tabs" role="group" aria-label="Kategori seç">
        {kategoriler.map((kategori) => (
          <button
            key={kategori.id}
            type="button"
            className="category-tab"
            aria-pressed={aktifKategori === kategori.id}
            onClick={() => setAktifKategori(kategori.id)}
          >
            <img src={kategori.ikon} alt="" />
            {kategori.ad}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {urunler.map((urun) => (
          <ProductCard key={urun.id} urun={urun} />
        ))}
      </div>
    </section>
  )
}

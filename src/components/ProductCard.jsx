export default function ProductCard({ urun }) {
  return (
    <article className="product-card">
      <img src={urun.resim} alt={urun.ad} />
      <h3>{urun.ad}</h3>
      <div className="product-meta">
        <span aria-label={`Puan ${urun.puan}`}>{urun.puan}</span>
        <span aria-label={`${urun.yorum} değerlendirme`}>({urun.yorum})</span>
        <strong>{urun.fiyat}₺</strong>
      </div>
    </article>
  )
}

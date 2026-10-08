import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <li>
      <article className="product-card" data-cy="product-card">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        <h3 className="product-card__name">
          <Link to="/siparis">{product.name}</Link>
        </h3>
        <div className="product-card__meta">
          <span aria-label={`Puan ${product.rating}`}>{product.rating}</span>
          <span aria-label={`${product.reviewCount} değerlendirme`}>({product.reviewCount})</span>
          <strong>{product.price}₺</strong>
        </div>
      </article>
    </li>
  )
}
